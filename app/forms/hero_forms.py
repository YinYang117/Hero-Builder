from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError, InputRequired
from app.models import Hero

def resourceCheck(form, field):
    resource = form.data["resource"]
    if resource != 1 and resource != 0:
        raise ValidationError('Resource usage must be Yes or No.')


# Vars set to camelcase
def resourceNameCheck(form, field):
    # If resource is True, validate resource name
    resource = form.data["resource"]
    if resource == 1:
        name = form.data["resourceName"]
        if isinstance(name, str):
            if len(name) < 2 or len(name) > 20:
                raise ValidationError('Resource Name must be between 2 and 20 characters long.')
        else:
            raise ValidationError('Resource Name must be a String between 2 and 20 characters long.')


def resourceAmountCheck(form, field):
    # If resource is True, validate resource amount
    resource = form.data["resource"]
    if resource == 1:
        amount = form.data["resourceAmount"]
        if isinstance(amount, int):
            if amount < 10 or amount > 3000:
                raise ValidationError('Resource Amount must be between 10 and 3000.')
        else:
            raise ValidationError('Resource Amount must be an Integer between 10 and 3000.')


class NewHero(FlaskForm):
    ownerId = IntegerField("Owner", validators=[DataRequired()])
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=30)])
    intro = StringField("Hero intro", validators=[DataRequired(), Length(min=2, max=500)])
    heroImage = StringField("Hero Image", validators=[DataRequired()])
    hp = IntegerField("HitPoints", validators=[DataRequired(), NumberRange(min=100, max=10000)])
    resource = IntegerField("Resource", validators=[resourceCheck])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceAmount = IntegerField("Resource Amount", validators=[resourceAmountCheck])
    physicalArmor = IntegerField("Physical Armor", validators=[DataRequired(), NumberRange(min=1, max=500)])
    magicResist = IntegerField("Magic Resist", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackDamage = IntegerField("Attack Damage", validators=[DataRequired(), NumberRange(min=10, max=2000)])
    attackRange = IntegerField("Attack Range", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackSpeed = FloatField("Attack Speed", validators=[DataRequired(), NumberRange(min=0.1, max=10.0)])
    moveSpeed = FloatField("Move Speed", validators=[DataRequired(), NumberRange(min=1.0, max=20.0)])
    # numOfAbilities = IntegerField("Number of Abilities", validators=[DataRequired(), NumberRange(min=0, max=10)])
    details = StringField("Hero Details")
    submit = SubmitField("Submit")
    # created_at and updated_at on API


class EditHero(FlaskForm):
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=30)])
    intro = StringField("Hero intro", validators=[DataRequired(), Length(min=2, max=500)])
    heroImage = StringField("Hero Image", validators=[DataRequired()])
    hp = IntegerField("HitPoints", validators=[DataRequired(), NumberRange(min=100, max=10000)])
    resource = IntegerField("Resource", validators=[resourceCheck])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceAmount = IntegerField("Resource Amount", validators=[resourceAmountCheck])
    physicalArmor = IntegerField("Physical Armor", validators=[DataRequired(), NumberRange(min=1, max=500)])
    magicResist = IntegerField("Magic Resist", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackDamage = IntegerField("Attack Damage", validators=[DataRequired(), NumberRange(min=10, max=2000)])
    attackRange = IntegerField("Attack Range", validators=[DataRequired(), NumberRange(min=1, max=500)])
    attackSpeed = FloatField("Attack Speed", validators=[DataRequired(), NumberRange(min=0.1, max=10.0)])
    moveSpeed = FloatField("Move Speed", validators=[DataRequired(), NumberRange(min=1.0, max=20.0)])
    # numOfAbilities = IntegerField("Number of Abilities", validators=[DataRequired(), NumberRange(min=0, max=10)])
    details = StringField("Hero Details")
    submit = SubmitField("Submit")