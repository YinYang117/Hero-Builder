from app.models import db, Ability

def seed_abilities():
    abil1 = Ability(
        owner_id=2,
        name="Wind Blast",
        description="This Spell will blast a giant gust of Air at your opponents. It gets more powerful as the game goes on further increasing the distance that they will be blown back.",
        ability_image="https://res.cloudinary.com/dzrimpg5t/image/upload/v1652913887/magic_gnchct.png",
        uses_resource=1,
        resource_name="Mana",
        resource_cost=150,
        uses_charges=0,
        uses_cooldown=1,
        cooldown=5,
        channeled=0,
        ultimate=0,
        details="The precise amount of knockback is a complicated formula that I will describe here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
        )
    abil2 = Ability(
        owner_id=2,
        name="Ball of Fire",
        description="This Spell will blast a giant Fireball at your opponents. It gets more powerful as the game goes on. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do.",
        ability_image="https://res.cloudinary.com/dzrimpg5t/image/upload/v1652913823/fireball_vrtuhf.png",
        uses_resource=1,
        resource_name="Energy",
        resource_cost=15,
        uses_charges=1,
		num_charges=5,
		charge_recharge_rate=8,
        uses_cooldown=0,
        channeled=0,
        ultimate=0,
        details="Torem ipsum dolor sit amet, conananae illieun Amma siue sectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
        )


    db.session.add(abil1)
    db.session.add(abil2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_abilities():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
