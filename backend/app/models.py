from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, unique=True, index=True, nullable=True)
    platform = Column(String) # whatsapp, instagram, facebook, tiktok
    platform_id = Column(String, unique=True, index=True) # ID from the platform
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    orders = relationship("Order", back_populates="customer")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    status = Column(String, default="pending") # pending, confirmed, shipped, delivered, cancelled
    total_amount = Column(Float, default=0.0)
    payment_method = Column(String, nullable=True) # cod, card, easypaisa, jazzcash
    shipping_address = Column(Text, nullable=True)
    raw_message = Column(Text, nullable=True) # Original DM/Message that initiated the order
    extracted_items = Column(JSON) # JSON array of {product_name, quantity, price}
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    customer = relationship("Customer", back_populates="orders")
    payment = relationship("Payment", back_populates="order", uselist=False)
    delivery = relationship("Delivery", back_populates="order", uselist=False)

class InventoryItem(Base):
    __tablename__ = "inventory"
    
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    stock_quantity = Column(Integer, default=0)
    low_stock_threshold = Column(Integer, default=5)
    price = Column(Float, default=0.0)

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    status = Column(String, default="pending") # pending, completed, failed, refunded
    provider = Column(String) # stripe, paypal, jazzcash, cod
    transaction_id = Column(String, nullable=True)
    
    order = relationship("Order", back_populates="payment")

class Delivery(Base):
    __tablename__ = "deliveries"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    courier = Column(String, nullable=True)
    tracking_number = Column(String, nullable=True)
    status = Column(String, default="processing") # processing, shipped, out_for_delivery, delivered
    
    order = relationship("Order", back_populates="delivery")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="staff") # admin, owner, staff, accountant
    is_active = Column(Boolean, default=True)
