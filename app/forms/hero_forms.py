from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError, InputRequired
from app.models import Hero

# Vars set to camelcase

def resourceNameCheck(form, field):
    # If resource is True, validate resource name
    resource = form.data["resource"]
    print("----------------------- RESOURCE", resource)
    if resource == True:
        name = form.data["resourceName"]
        if len(name) < 2 or len(name) > 20:
            ValidationError('Resource Name must be between 2 and 20 characters long.')


def resourceAmountCheck(form, field):
    # If resource is True, validate resource name
    resource = form.data["resource"]
    print("----------------------- RESOURCE", resource)
    if resource == True:
        amount = form.data["resourceAmount"]
        if amount < 10 or amount > 3000:
            ValidationError('Resource Amount must be between 10 and 3000.')


class NewHero(FlaskForm):
    ownerId = IntegerField("Owner", validators=[DataRequired()])
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=50)])
    intro = StringField("Hero intro", validators=[DataRequired(), Length(min=2, max=500)])
    heroImage = StringField("Hero Image", validators=[DataRequired()])
    hp = IntegerField("HitPoints", validators=[DataRequired(), NumberRange(min=100, max=10000)])
    resource = BooleanField("Resource", false_values=(False, 'false', '', 'False', 0), validators=[InputRequired()])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceAmount = IntegerField("Resource Amount", validators=[resourceAmountCheck])
    physicalArmor = IntegerField("Physical Armor", validators=[DataRequired(), NumberRange(min=0, max=500)])
    magicResist = IntegerField("Magic Resist", validators=[DataRequired(), NumberRange(min=0, max=500)])
    attackDamage = IntegerField("Attack Damage", validators=[DataRequired(), NumberRange(min=10, max=2000)])
    attackRange = IntegerField("Attack Range", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackSpeed = FloatField("Attack Speed", validators=[DataRequired(), NumberRange(min=0.1, max=10.0)])
    moveSpeed = FloatField("Move Speed", validators=[DataRequired(), NumberRange(min=1.0, max=20.0)])
    numOfAbilities = IntegerField("Number of Abilities", validators=[DataRequired(), NumberRange(min=0, max=10)])
    details = StringField("Hero Details")
    submit = SubmitField("Submit")
    # created_at and updated_at on API


class EditHero(FlaskForm):
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=50)])
    intro = StringField("Hero intro", validators=[DataRequired(), Length(min=2, max=500)])
    heroImage = StringField("Hero Image", validators=[DataRequired()])
    hp = IntegerField("HitPoints", validators=[DataRequired(), NumberRange(min=100, max=10000)])
    resource = BooleanField("Resource", validators=[DataRequired()])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceAmount = IntegerField("Resource Amount", validators=[resourceAmountCheck])
    physicalArmor = IntegerField("Physical Armor", validators=[DataRequired(), NumberRange(min=0, max=500)])
    magicResist = IntegerField("Magic Resist", validators=[DataRequired(), NumberRange(min=0, max=500)])
    attackDamage = IntegerField("Attack Damage", validators=[DataRequired(), NumberRange(min=10, max=2000)])
    attackRange = IntegerField("Attack Range", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackSpeed = FloatField("Attack Speed", validators=[DataRequired(), NumberRange(min=0.1, max=10.0)])
    moveSpeed = FloatField("Move Speed", validators=[DataRequired(), NumberRange(min=1.0, max=20.0)])
    numOfAbilities = IntegerField("Number of Abilities", validators=[DataRequired(), NumberRange(min=0, max=10)])
    details = StringField("Hero Details")
    submit = SubmitField("Submit")