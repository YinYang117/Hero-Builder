from flask.cli import AppGroup
from .users import seed_users, undo_users
from .heros import seed_heros, undo_heros
from .abilities import seed_abilities, undo_abilities

# Creates a seed group to hold our commands
# IE: So we can type `flask seed (AppGroup) all (command)`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute('TRUNCATE table hero_builder_schema.users RESTART IDENTITY CASCADE;')
        db.session.execute('TRUNCATE table hero_builder_schema.heros RESTART IDENTITY CASCADE;')
        db.session.execute('TRUNCATE table hero_builder_schema.abilities RESTART IDENTITY CASCADE;')
        db.session.commit()
    seed_users()
    seed_heros()
    seed_abilities()
    # Add future seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_abilities()
    undo_heros()
    undo_users()
    # Add other future undo functions here
