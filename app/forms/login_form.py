from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credential = form.data["credential"]
    user = User.query.filter(User.email == credential).first()
    print("-------------------login debug 1", user)
    if not user:
        user = User.query.filter(User.username == credential).first()
        print("-------------------login debug 2", user)
        if not user:
            print("---------------------login debug 3")
            raise ValidationError('User not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data['credential']
    user = User.query.filter(User.email == credential).first()
    if user:
        if not user.check_password(password):
            raise ValidationError('Password was incorrect.')
    else:
        user = User.query.filter(User.username == credential).first()
        if user:
            if not user.check_password(password):
                raise ValidationError('Password was incorrect.')
        else:
            raise ValidationError('User not found. Check Email / Username and try again.')



class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
