from flask import Blueprint, jsonify, session, request
from app.models import User, Ability, db
from app.forms import NewAbility
from app.forms import EditAbility
from datetime import date
# from flask_login import current_user

ability_routes = Blueprint('abilities', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# # form.errors come from using a Form() to validate or run custom functions
# # can catch errors on the front end
# # example:
#     if current_user.is_authenticated:
#         return current_user.to_dict()
#     return {'errors': ['Unauthorized']}

#     if form.validate_on_submit():
#         return stuff
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ability_routes.route('/all', methods=['GET'])
def all_heros():
    """
    Returns all Abilities. Requires User be logged in with main Admin account. Intended for backend use only.
    """
    data = request.get_json(force=True)
    if data["userId"] == 1:
    # if data["user.id"] == 1:
        abilities = Ability.query.all()
        all_abl = {}
        for abil in abilities:
            all_abl[abil.id] = abil.to_js_obj
        return all_abl
    else:
        return {}


@ability_routes.route('/', methods=['GET', 'POST'])
def abilities():
    """
    Main route for getting all a User's Abilities, and Ability Creation.
    """
    if request.method == 'GET':
        data = request.get_json(force=True)
        # passing userId
        abils = Ability.query.filter(Ability.owner_id == data["userId"]).all()
        all_abl = {}
        for abil in abilities:
            all_abl[abil.id] = abil.to_js_obj
        return all_abl

    if request.method == "POST":
        form = EditAbility()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            abil = form.populate_obj(Ability)
            db.session.add(abil)
            db.session.commit()
            return abil.to_js_obj
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ability_routes.route('/:id', methods=['GET', 'PUT', 'DELETE'])
def specific_abil():
    """
    Main route for getting, editing, and deleting an Ability.
    """
    abil = Ability.query.get(id)
    if abil:
        if request.method == "GET":
            return abil.to_js_obj
        
        if request.method == "PUT":
            form = EditAbility
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                form.populate_obj(abil)
                updt = date.today()
                abil.updated_at = updt
                db.session.add(abil)
                db.session.commit()
                return abil.to_js_obj
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 401

        if request.method == "DELETE":
            data = request.get_json(force=True) # passing userId
            if abil.owner_id == data["userId"]:
                db.session.delete(abil)
                db.session.commit()
                return {'deletion': 'successful'}
            else:
                return {"errors": ["User Id passed did not match Ability's owner."]}
    else:
        return {}
