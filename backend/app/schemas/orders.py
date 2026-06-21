from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class SocialMessage(BaseModel):
    platform: str # "whatsapp", "instagram", "facebook"
    sender_id: str
    sender_name: Optional[str] = None
    message_text: str
    timestamp: str

class ExtractedProduct(BaseModel):
    product_name: str
    quantity: int
    price: Optional[float] = None

class OrderExtractionResult(BaseModel):
    is_order: bool
    is_spam: bool
    customer_name: Optional[str] = None
    phone_number: Optional[str] = None
    shipping_address: Optional[str] = None
    payment_method: Optional[str] = None
    products: List[ExtractedProduct] = []
    total_estimated_amount: float = 0.0
