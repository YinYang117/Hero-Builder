from .db import db
from datetime import date

class Hero(db.Model):
    __tablename__ = "heros"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(255))
    intro = 
    hit_points
    resource_name
    resource_amount
    physical_armor
    magic_resist
    attack_damage
    attack_range
    attack_speed
    move_speed
    num_of_abilities
    details
