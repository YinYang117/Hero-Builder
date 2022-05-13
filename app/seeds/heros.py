from app.models import db, Hero


def seed_heros():
    hero1 = Hero(
        owner_id=1,
        name="Test Hero",
        intro="Hero Intro",
        hero_image="https://i.stack.imgur.com/XA5Jn.jpg?s=64&g=1",
        hp=2000,
        resource=True,
        resource_name="Energy",
        resource_amount=100,
        physical_armor=50,
        magic_resist=50,
        attack_damage=200,
        attack_range=10,
        attack_speed=3,
        move_speed=6,
        num_of_abilities=5,
        details="Lots of effort here",
        )
    hero2 = Hero(
        owner_id=1,
        name="Ranged DPS",
        intro="This is a great model for a balanced ranged damage dealer.",
        hero_image="https://i.stack.imgur.com/XA5Jn.jpg?s=64&g=1",
        hp=1500,
        resource=False,
        physical_armor=25,
        magic_resist=25,
        attack_damage=1000,
        attack_range=400,
        attack_speed=6,
        move_speed=8,
        num_of_abilities=6,
        details="This is a fast moving high damage hero that can kite and kill slower heros with ease.",
        )


    db.session.add(hero1)
    db.session.add(hero2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_heros():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()