from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credential = form.data["credential"]
    print("--------auth route comp", credential)
    user = User.query.filter(User.email == credential).first()
    print("---------- user auth route", user)
    if not user:
        raise ValidationError('Credential provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data['credential']
    user = User.query.filter((User.email == credential) or (User.username == credential)).first()
    print("-----------1 password match form login", credential)
    print("-----------2 password match form login", user)
    print("-----------3 password match form login", User.query.filter(User.username == credential).first())
    print("-----------4 password match form login", User.query.filter(User.email == credential).first())

    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
