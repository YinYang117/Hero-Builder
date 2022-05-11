from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField
from wtforms.validators import DataRequired, Length, NumberRange
from app.models import Hero

# Vars set to camelcase

def resourceNameCheck(form, field):
    # If resource is True, validate resource name
    resource = form.data["resource"]
    if resource is True:
        name = field.data["resourceName"]
        if len(name) < 2 or len(name) > 20:
            ValidationError('Resource Name must be between 2 and 20 characters long.')

def resourceNameCheck(form, field):
    # If resource is True, validate resource name
    resource = form.data["resource"]
    if resource is True:
        amount = field.data["resourceAmount"]
        if amount < 10 or amount > 3000:
            ValidationError('Resource Amount must be between 10 and 3000.')


class NewHero(FlaskForm):
    ownerId = IntegerField("Owner", validators=[DataRequired()])
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=50)])
    intro = StringField("Hero intro", validators=[DataRequired(), Length(min=2, max=500)])
    heroImage = StringField("Hero Image", validators=[DataRequired()])
    hp = IntegerField("HitPoints", validators=[DataRequired(), NumberRange(min=100, max=10000)])
    resource = BooleanField("Resource", validators=[DataRequired()])
    resourceName = db.Column("Resource Name", validators=[resourceNameCheck])
    resourceAmount = db.Column("Resource Amount", validators=[resourceAmountCheck])
    physicalArmor = db.Column("Physical Armor", validators=[DataRequired(), NumberRange(min=0, max=500)])
    magicResist = db.Column("Magic Resist", validators=[DataRequired(), NumberRange(min=0, max=500)])
    attackDamage = db.Column("Attack Damage", validators=[DataRequired(), NumberRange(min=10, max=2000)])
    attackRange = db.Column("Attack Range", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackSpeed = db.Column("Attack Speed", validators=[DataRequired(), NumberRange(min=0.1, max=10.0)])
    moveSpeed = db.Column("Move Speed", validators=[DataRequired(), NumberRange(min=1.0, max=20.0)])
    numOfAbilities = db.Column("Number of Abilities", validators=[DataRequired(), NumberRange(min=0, max=10)])
    details = db.Column("Hero Details")
    submit = SubmitField("Submit")
    # created_at and updated_at on API


class EditHero(FlaskForm):
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=50)])
    intro = StringField("Hero intro", validators=[DataRequired(), Length(min=2, max=500)])
    heroImage = StringField("Hero Image", validators=[DataRequired()])
    hp = IntegerField("HitPoints", validators=[DataRequired(), NumberRange(min=100, max=10000)])
    resource = BooleanField("Resource", validators=[DataRequired()])
    resourceName = db.Column("Resource Name", validators=[resourceNameCheck])
    resourceAmount = db.Column("Resource Amount", validators=[resourceAmountCheck])
    physicalArmor = db.Column("Physical Armor", validators=[DataRequired(), NumberRange(min=0, max=500)])
    magicResist = db.Column("Magic Resist", validators=[DataRequired(), NumberRange(min=0, max=500)])
    attackDamage = db.Column("Attack Damage", validators=[DataRequired(), NumberRange(min=10, max=2000)])
    attackRange = db.Column("Attack Range", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackSpeed = db.Column("Attack Speed", validators=[DataRequired(), NumberRange(min=0.1, max=10.0)])
    moveSpeed = db.Column("Move Speed", validators=[DataRequired(), NumberRange(min=1.0, max=20.0)])
    numOfAbilities = db.Column("Number of Abilities", validators=[DataRequired(), NumberRange(min=0, max=10)])
    details = db.Column("Hero Details")
    submit = SubmitField("Submit")