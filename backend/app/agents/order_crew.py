import os
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
from app.schemas.orders import OrderExtractionResult
import json

# Ensure OPENAI_API_KEY is set in environment variables
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# Define Agents
spam_detection_agent = Agent(
    role="Spam & Intent Analyzer",
    goal="Analyze incoming social media messages to determine if they contain an actual purchase intent or order request, and flag spam or irrelevant chatter.",
    backstory="You are the first line of defense for a high-volume social commerce store. You filter out 'hi', 'how are you', spam bots, and complaints, letting only real purchase queries pass through.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

order_extraction_agent = Agent(
    role="Order Data Extractor",
    goal="Extract structured customer and order information (products, quantities, payment method, address) from social media messages.",
    backstory="You are an expert data entry assistant. You read messy WhatsApp or Instagram DMs and perfectly extract what the user wants to buy, where to ship it, and how they want to pay.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

# Define Tasks
def create_order_extraction_crew(message_text: str):
    analyze_intent_task = Task(
        description=f"Analyze the following message and determine if it's an order/purchase intent or just spam/general query. Message: '{message_text}'",
        expected_output="A boolean classification indicating if this is an order intent or not.",
        agent=spam_detection_agent
    )

    extract_data_task = Task(
        description=f"If the message is an order, extract the customer name, phone, address, payment method (e.g. COD, JazzCash), and a list of products with quantities. Message: '{message_text}'",
        expected_output="""A raw JSON object with the exact following schema, nothing else:
        {
            "is_order": true/false,
            "is_spam": true/false,
            "customer_name": "extracted name or null",
            "phone_number": "extracted phone or null",
            "shipping_address": "extracted address or null",
            "payment_method": "extracted method or null",
            "products": [{"product_name": "name", "quantity": 1}],
            "total_estimated_amount": 0.0
        }""",
        agent=order_extraction_agent
    )

    crew = Crew(
        agents=[spam_detection_agent, order_extraction_agent],
        tasks=[analyze_intent_task, extract_data_task],
        verbose=True,
        process=Process.sequential
    )
    
    return crew

async def process_social_message(message_text: str) -> OrderExtractionResult:
    """Runs the CrewAI pipeline to extract order details from a message."""
    crew = create_order_extraction_crew(message_text)
    
    # Kickoff the crew process
    result = crew.kickoff()
    
    try:
        # CrewAI returns the raw string from the last task. We parse the JSON.
        # Handle potential markdown formatting from LLM
        clean_json = str(result.raw).strip()
        if clean_json.startswith("```json"):
            clean_json = clean_json[7:-3].strip()
        elif clean_json.startswith("```"):
             clean_json = clean_json[3:-3].strip()
             
        parsed_data = json.loads(clean_json)
        return OrderExtractionResult(**parsed_data)
    except Exception as e:
        print(f"Error parsing CrewAI output: {e}")
        # Return a safe fallback indicating failure to parse
        return OrderExtractionResult(is_order=False, is_spam=True)
