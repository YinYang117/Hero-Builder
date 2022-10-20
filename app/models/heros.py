# environment for production check and add_prefix-for_prod for schema naming
from .db import db, environment, add_prefix_for_prod
from datetime import date
from .hero_abilities import hero_abilities
from app.models import User

class Hero(db.Model):
    __tablename__ = "heros"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    intro = db.Column(db.String(500), nullable=False)
    hero_image = db.Column(db.String(), nullable=False)
    hp = db.Column(db.Integer, nullable=False)
    resource = db.Column(db.Integer, nullable=False)
    resource_name = db.Column(db.String(20), nullable=True)
    resource_amount = db.Column(db.Integer, nullable=True)
    physical_armor = db.Column(db.Integer, nullable=False)
    magic_resist = db.Column(db.Integer, nullable=False)
    attack_damage = db.Column(db.Integer, nullable=False)
    attack_range = db.Column(db.Integer, nullable=False)
    attack_speed = db.Column(db.Float(precision=1), nullable=False)
    move_speed = db.Column(db.Float(precision=1), nullable=False)
    # num_of_abilities = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String(), nullable=True)
    # created_at = db.Column(db.Date, nullable=False, default=date.today)
    # updated_at = db.Column(db.Date, nullable=False, default=date.today)

    owner = db.relationship("User", back_populates="heros")
    hero_equipped_abilities = db.relationship("Ability", secondary=hero_abilities, back_populates="used_by_hero")

    @property
    def to_js_obj(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "name": self.name,
            "intro": self.intro,
            "heroImage": self.hero_image,
            "hp": self.hp,
            "resource": self.resource,
            "resourceName": self.resource_name,
            "resourceAmount": self.resource_amount,
            "physicalArmor": self.physical_armor,
            "magicResist": self.magic_resist,
            "attackDamage": self.attack_damage,
            "attackRange": self.attack_range,
            "attackSpeed": self.attack_speed,
            "moveSpeed": self.move_speed,
            # "numOfAbilities": self.num_of_abilities,
            "details": self.details,
            # "createdAt": self.created_at,
            # "updatedAt": self.updated_at,
        }
