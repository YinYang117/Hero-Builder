from .db import db


hero_abilities = db.Table("hero_abilities",
    db.Column("hero_id", db.Integer, db.ForeignKey("heros.id"), primary_key=True),
    db.Column("ability_id", db.Integer, db.ForeignKey("abilities.id"), primary_key=True)
)
