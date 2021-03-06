from flask.cli import AppGroup
from .users import seed_users, undo_users
from .heros import seed_heros, undo_heros
from .abilities import seed_abilities, undo_abilities

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_heros()
    seed_abilities()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_abilities()
    undo_heros()
    undo_users()

    # Add other undo functions here
