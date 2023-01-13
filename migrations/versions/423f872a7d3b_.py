"""empty message

Revision ID: 423f872a7d3b
Revises: 55b16913c534
Create Date: 2023-01-13 10:44:28.074148

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '423f872a7d3b'
down_revision = '55b16913c534'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('user_icon', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'user_icon')
    # ### end Alembic commands ###