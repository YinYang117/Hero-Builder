# environment for production check and add_prefix-for_prod for schema naming
from .db import db, environment, SCHEMA, add_prefix_for_prod


hero_abilities = db.Table("hero_abilities",
    db.Column(
            "hero_id", db.Integer,
            db.ForeignKey(add_prefix_for_prod("heros.id")),
            primary_key=True
        ),
    db.Column(
            "ability_id", db.Integer,
            db.ForeignKey(add_prefix_for_prod("abilities.id")),
            primary_key=True
        )
)

if environment == "production":
    hero_abilities.schema = SCHEMA
