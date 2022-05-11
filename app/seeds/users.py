from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    yinyang = User(
        username='YinYang117', email='admin@aa.io', password='admin117')
    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    db.session.add(yinyang)
    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
