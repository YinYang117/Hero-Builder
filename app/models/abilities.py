from .db import db
from datetime import date

class Ability(db.Model):
    __tablename__ = "abilities"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    ability_image = db.Column(db.String, nullable=False)
    uses_resource = db.Column(db.Boolean, nullable=False)
    resource_name = db.Column(db.String(20), nullable=True)
    resource_cost = db.Column(db.Integer, nullable=True)
    uses_charges = db.Column(db.Boolean, nullable=False)
    num_charges = db.Column(db.Integer, nullable=True)
    charge_recharge_rate = db.Column(db.Integer, nullable=True)
    uses_cooldown = db.Column(db.Boolean, nullable=False)
    cooldown = db.Column(db.Integer, nullable=True)
    channeled = db.Column(db.Boolean, nullable=False)
    channel_time = db.Column(db.Float(precision=3), nullable=True)
    details = db.Column(db.String, nullable=True)
    created_at = db.Column(db.Date, nullable=False, default=date.today)
    updated_at = db.Column(db.Date, nullable=False, default=date.today)

    owner = db.relationship("User", back_populates="abilities")
    used_by_hero = db.relationship("Hero", secondary=hero_abilities, back_populates="hero_equipped_abilities")

    @property
    def uses_resource(self):
        return self.uses_resource

    @property
    def uses_cooldown(self):
        return self.uses_cooldown

    @property
    def uses_charges(self):
        return self.uses_charges

    @property
    def channeled(self):
        return self.channeled

    @property
    def to_js_obj(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "name": self.name,
            "description": self.description,
            "abilityImage": self.ability_image,
            "usesResource": self.uses_resource
            "resourceName": self.resource_name,
            "resourceCost": self.resource_cost
            "usesCharges": self.uses_charges
            "numCharges": self.num_charges
            "chargeRechargeRate": self.charge_recharge_rate
            "usesCooldown": self.uses_cooldown
            "cooldown": self.cooldown
            "channeled": self.channeled
            "channelTime": self.channel_time
            "details": self.details,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
    
    
    
    
