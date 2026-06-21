from fastapi import FastAPI, Depends, BackgroundTasks, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import engine, Base, get_db
from app.models import Customer, Order
from app.schemas.orders import SocialMessage
from app.agents.order_crew import process_social_message

import logging
from typing import List

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Social Commerce AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/orders")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.on_event("startup")
async def startup():
    # Initialize database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
def read_root():
    return {"status": "ok", "service": "Social Commerce AI Engine"}

async def handle_new_message(msg: SocialMessage, db: AsyncSession):
    """Background task to process incoming social media DMs/Messages via AI Agents."""
    logger.info(f"Processing message from {msg.platform}: {msg.message_text}")
    
    # 1. Run CrewAI Extraction Pipeline
    extraction = await process_social_message(msg.message_text)
    
    if extraction.is_spam:
        logger.info(f"Message flagged as spam: {msg.message_text}")
        return
        
    if not extraction.is_order:
        logger.info(f"Message is not an order: {msg.message_text}")
        # Could route to Customer Support AI agent here (Phase 6)
        return

    logger.info(f"Order Detected! Extracted Data: {extraction.model_dump_json()}")

    # 2. Find or Create Customer
    stmt = select(Customer).where(Customer.platform_id == msg.sender_id, Customer.platform == msg.platform)
    result = await db.execute(stmt)
    customer = result.scalars().first()

    if not customer:
        customer = Customer(
            name=extraction.customer_name or msg.sender_name or "Unknown",
            phone=extraction.phone_number,
            platform=msg.platform,
            platform_id=msg.sender_id
        )
        db.add(customer)
        await db.commit()
        await db.refresh(customer)

    # 3. Create Order
    new_order = Order(
        customer_id=customer.id,
        status="pending",
        total_amount=extraction.total_estimated_amount,
        payment_method=extraction.payment_method,
        shipping_address=extraction.shipping_address,
        raw_message=msg.message_text,
        extracted_items=[item.model_dump() for item in extraction.products]
    )
    db.add(new_order)
    await db.commit()
    
    # 4. In Phase 7, we will emit a WebSocket event to the frontend dashboard here
    logger.info(f"Successfully saved Order {new_order.id} to Database.")
    
    # Push real-time notification to Dashboard
    await manager.broadcast(f"New Order #{new_order.id} received from {msg.platform}!")


@app.post("/api/v1/webhooks/social")
async def social_webhook(message: SocialMessage, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    """
    Unified webhook endpoint for Facebook, Instagram, TikTok, WhatsApp.
    Receives messages and processes them asynchronously using AI.
    """
    # Run the heavy AI processing in the background to return 200 OK to the social platform immediately
    background_tasks.add_task(handle_new_message, message, db)
    return {"status": "received", "message": "Queued for AI processing"}
