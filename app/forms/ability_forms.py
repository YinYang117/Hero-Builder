from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField, FloatField
from wtforms.validators import DataRequired, Length, ValidationError, InputRequired

# TODO if any of these fail because of TypeErrors, None types, etc. I may need to add
# extra validations like on hero. But even that didnt totally work. So make sure I pass
# Something from the front end forms.

# Vars set to camelcase
def resourceCheck(form, field):
    resource = form.data["usesResource"]
    if resource != 1 and resource != 0:
        raise ValidationError('Uses Resource must be Yes or No.')

def resourceNameCheck(form, field):
    resource = form.data["usesResource"]
    if resource == 1:
        name = form.data["resourceName"]
        if len(name) < 2 or len(name) > 20:
            raise ValidationError('Resource Name must be between 2 and 20 characters long.')

def resourceCostCheck(form, field):
    resource = form.data["usesResource"]
    if resource == 1:
        amount = form.data["resourceCost"]
        if amount < 1 or amount > 1000:
            raise ValidationError('Resource Cost must be between 1 and 1000.')
    
def useChargesCheck(form, field):
    ucharges = form.data["usesCharges"]
    if ucharges != 1 and ucharges != 0:
        raise ValidationError('Uses Charges must be Yes or No.')
    
def numChargesCheck(form, field):
    charge = form.data["usesCharges"]
    if charge == 1:
        charges = form.data["numCharges"]
        if charges < 1 or charges > 100:
            raise ValidationError('Number of Charges must be between 1 and 100.')

def chargeRechargeRateCheck(form, field):
    charge = form.data["usesCharges"]
    if charge == 1:
        recharge = form.data["chargeRechargeRate"]
        if recharge < 1 or recharge > 120:
            raise ValidationError('Number of Charges must be between 1 and 120.')

def usesCdCheck(form, field):
    ucd = form.data["usesCooldown"]
    if ucd != 1 and ucd != 0:
        raise ValidationError('Uses Cooldown must be Yes or No.')

def cooldownCheck(form, field):
    ucd = form.data["usesCooldown"]
    if ucd == 1:
        cd = form.data["cooldown"]
        if cd < 2 or cd > 120:
            raise ValidationError('Cooldown must be between 2 and 120.')

def channeledCheck(form, field):
    chan = form.data["channeled"]
    if chan != 1 and chan != 0:
        raise ValidationError('Channeled must be Yes or No.')

def channeledCheck(form, field):
    chan = form.data["channeled"]
    if chan == 1:
        ct = form.data["channelTime"]
        if ct < 1.5 or ct > 20:
            raise ValidationError('Channel Time must be between 1.5 and 10.')

def ultCheck(form, field):
    ult = form.data["ultimate"]
    if ult != 1 and ult != 0:
        raise ValidationError('Ultimate must be Yes or No.')


class NewAbility(FlaskForm):
    ownerId = IntegerField("Owner", validators=[DataRequired()])
    name = StringField("Ability Name", validators=[DataRequired(), Length(min=2, max=30)])
    description = StringField("Description", validators=[DataRequired(), Length(min=2, max=500)])
    abilityImage = StringField("Ability Image", validators=[DataRequired()])
    usesResource = IntegerField("Uses Resource", validators=[resourceCheck])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceCost = IntegerField("Resource Cost", validators=[resourceCostCheck])
    usesCharges = IntegerField("Uses Charges", validators=[useChargesCheck])
    numCharges = IntegerField("Number of Charges", validators=[numChargesCheck])
    chargeRechargeRate = IntegerField("Charge Recharge Rate", validators=[chargeRechargeRateCheck])
    usesCooldown = IntegerField("Uses Cooldown", validators=[usesCdCheck])
    cooldown = IntegerField("Cooldown", validators=[cooldownCheck])
    channeled = IntegerField("Channeled", validators=[channeledCheck])
    channelTime = FloatField("Channeled Time", validators=[channeledCheck])
    ultimate = IntegerField("Ultimate", validators=[ultCheck])
    details = StringField("Details")
    submit = SubmitField("Submit")


class EditAbility(FlaskForm):
    name = StringField("Ability Name", validators=[DataRequired(), Length(min=2, max=30)])
    description = StringField("Description", validators=[DataRequired(), Length(min=2, max=500)])
    abilityImage = StringField("Ability Image", validators=[DataRequired()])
    usesResource = IntegerField("Uses Resource", validators=[resourceCheck])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceCost = IntegerField("Resource Cost", validators=[resourceCostCheck])
    usesCharges = IntegerField("Uses Charges", validators=[useChargesCheck])
    numCharges = IntegerField("Number of Charges", validators=[numChargesCheck])
    chargeRechargeRate = IntegerField("Charge Recharge Rate", validators=[chargeRechargeRateCheck])
    usesCooldown = IntegerField("Uses Cooldown", validators=[usesCdCheck])
    cooldown = IntegerField("Cooldown", validators=[cooldownCheck])
    channeled = IntegerField("Channeled", validators=[channeledCheck])
    channelTime = FloatField("Channeled Time", validators=[channeledCheck])
    ultimate = IntegerField("Ultimate", validators=[ultCheck])
    details = StringField("Details")
    submit = SubmitField("Submit")