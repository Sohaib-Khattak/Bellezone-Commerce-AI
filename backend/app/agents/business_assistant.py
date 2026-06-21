from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0.2)

system_prompt = """
You are 'OS_Nexus', an expert AI Business Assistant for a Social Commerce Operating System.
You have access to the merchant's real-time data including orders from TikTok, Instagram, Facebook, and WhatsApp.

The user will ask you questions about their business performance, inventory, and deliveries.
Since you don't have direct SQL access in this specific agent instance, generate a professional, strategic response based on the contextual data provided to you.

Context Data: {context}

User Query: {query}
"""

prompt_template = PromptTemplate(
    input_variables=["context", "query"],
    template=system_prompt
)

chain = LLMChain(llm=llm, prompt=prompt_template)

async def ask_business_assistant(query: str, context_data: str) -> str:
    """
    Takes a query from the Next.js dashboard chat interface, and generates a response.
    In Phase 9, `context_data` will be dynamically injected by running RAG against the Vector DB and PostgreSQL.
    """
    response = await chain.arun(context=context_data, query=query)
    return response
