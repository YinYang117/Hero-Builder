from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, BooleanField, DateField, FloatField
from wtforms.validators import DataRequired, Length, ValidationError, InputRequired


# Vars set to camelcase
def resourceNameCheck(form, field):
    resource = form.data["usesResource"]
    if resource == 1:
        name = form.data["resourceName"]
        if len(name) < 2 or len(name) > 20:
            ValidationError('Resource Name must be between 2 and 20 characters long.')

def resourceCostCheck(form, field):
    resource = form.data["usesResource"]
    if resource == 1:
        amount = form.data["resourceCost"]
        if amount < 1 or amount > 1000:
            ValidationError('Resource Cost must be between 1 and 1000.')
    
def numChargesCheck(form, field):
    charge = form.data["usesCharges"]
    if charge == 1:
        charges = form.data["numCharges"]
        if charges < 1 or charges > 100:
            ValidationError('Number of Charges must be between 1 and 100.')

def chargeRechargeRateCheck(form, field):
    charge = form.data["usesCharges"]
    if charge == 1:
        recharge = form.data["chargeRechargeRate"]
        if recharge < 1 or recharge > 120:
            ValidationError('Number of Charges must be between 1 and 120.')

def cooldownCheck(form, field):
    ucd = form.data["usesCooldown"]
    if ucd == 1:
        cd = form.data["cooldown"]
        if cd < 2 or cd > 120:
            ValidationError('Cooldown must be between 2 and 120.')

def channeledCheck(form, field):
    chan = form.data["channeled"]
    if chan == 1:
        ct = form.data["channelTime"]
        if ct < 1.5 or ct > 10:
            ValidationError('Channel Time must be between 1.5 and 10.')


class NewAbility(FlaskForm):
    ownerId = IntegerField("Owner", validators=[DataRequired()])
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=50)])
    description = StringField("Description", validators=[DataRequired(), Length(min=2, max=500)])
    abilityImage = StringField("Hero Image", validators=[DataRequired()])
    usesResource = IntegerField("Uses Resource", false_values=(False, 'false', '', 'False', 0), validators=[DataRequired()])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceCost = IntegerField("Resource Cost", validators=[resourceCostCheck])
    usesCharges = IntegerField("Uses Charges", false_values=(False, 'false', '', 'False', 0), validators=[DataRequired()])
    numCharges = IntegerField("Number of Charges", validators=[numChargesCheck])
    chargeRechargeRate = IntegerField("Charge Recharge Rate", validators=[chargeRechargeRateCheck])
    usesCooldown = IntegerField("Uses Cooldown", false_values=(False, 'false', '', 'False', 0), validators=[DataRequired()])
    cooldown = IntegerField("Cooldown", validators=[cooldownCheck])
    channeled = IntegerField("Channeled", false_values=(False, 'false', '', 'False', 0), validators=[DataRequired()])
    channelTime = FloatField("Channeled Time", validators=[channeledCheck])
    ultimate = IntegerField("Ultimate", false_values=(False, 'false', '', 'False', 0), validators=[DataRequired()])
    details = StringField("Details")
    submit = SubmitField("Submit")
    # created_at and updated_at on API


class EditAbility(FlaskForm):
    name = StringField("Hero Name", validators=[DataRequired(), Length(min=2, max=50)])
    description = StringField("Description", validators=[DataRequired(), Length(min=2, max=500)])
    abilityImage = StringField("Hero Image", validators=[DataRequired()])
    usesResource = IntegerField("Uses Resource", validators=[DataRequired()])
    resourceName = StringField("Resource Name", validators=[resourceNameCheck])
    resourceCost = IntegerField("Resource Cost", validators=[resourceCostCheck])
    usesCharges = IntegerField("Uses Charges", validators=[DataRequired()])
    numCharges = IntegerField("Number of Charges", validators=[numChargesCheck])
    chargeRechargeRate = IntegerField("Charge Recharge Rate", validators=[chargeRechargeRateCheck])
    usesCooldown = IntegerField("Uses Cooldown", validators=[DataRequired()])
    cooldown = IntegerField("Cooldown", validators=[cooldownCheck])
    channeled = IntegerField("Channeled", validators=[DataRequired()])
    channelTime = FloatField("Channeled Time", validators=[channeledCheck])
    ultimate = IntegerField("Ultimate", validators=[DataRequired()])
    details = StringField("Details")
    submit = SubmitField("Submit")