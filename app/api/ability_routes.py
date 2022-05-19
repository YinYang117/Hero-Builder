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

# # examples:
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


@ability_routes.route('/', methods=['POST'])
def abilities():
    """
    Main route for Ability Creation.
    """
    form = NewAbility()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        abil = Ability(
            owner_id = form.data["ownerId"],
            name = form.data["name"],
            description = form.data["description"],
            ability_image = form.data["abilityImage"],
            uses_resource = form.data["usesResource"],
            resource_name = form.data["resourceName"],
            resource_cost = form.data["resourceCost"],
            uses_charges = form.data["usesCharges"],
            num_charges = form.data["numCharges"],
            charge_recharge_rate = form.data["chargeRechargeRate"],
            uses_cooldown = form.data["usesCooldown"],
            cooldown = form.data["cooldown"],
            channeled = form.data["channeled"],
            channel_time = form.data["channelTime"],
            ultimate = form.data["ultimate"],
            details = form.data["details"],
        )
        db.session.add(abil)
        db.session.commit()
        return abil.to_js_obj
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ability_routes.route('/user/<int:id>', methods=['GET'])
def userAbils(id):
    """
    Main route for getting all Abilities for a User.
    """
    abils = Ability.query.filter(Ability.owner_id == id).all()
    all_abl = {}
    for abil in abils:
        all_abl[abil.id] = abil.to_js_obj
    return all_abl


@ability_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def specific_abil(id):
    """
    Main route for getting, editing, and deleting an Ability.
    """
    abil = Ability.query.get(id)
    if abil:
        if request.method == "GET":
            return abil.to_js_obj
        
        if request.method == "PUT":
            form = EditAbility()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                form.name = form.data["name"]
                form.description = form.data["description"]
                form.ability_image = form.data["abilityImage"]
                form.uses_resource = form.data["usesResource"]
                form.resource_name = form.data["resourceName"]
                form.resource_cost = form.data["resourceCost"]
                form.uses_charges = form.data["usesCharges"]
                form.num_charges = form.data["numCharges"]
                form.charge_recharge_rate = form.data["chargeRechargeRate"]
                form.uses_cooldown = form.data["usesCooldown"]
                form.cooldown = form.data["cooldown"]
                form.channeled = form.data["channeled"]
                form.channel_time = form.data["channelTime"]
                form.ultimate = form.data["ultimate"]
                form.details = form.data["details"]

                # updt = date.today()
                # abil.updated_at = updt

                db.session.add(abil)
                db.session.commit()
                return abil.to_js_obj
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 401

        if request.method == "DELETE":
            # data = request.get_json(force=True) # passing userId
            # if abil.owner_id == data["userId"]:
            db.session.delete(abil)
            db.session.commit()
            return {'deletion': 'successful'}
            # else:
            #     return {"errors": ["User Id passed did not match Ability's owner."]}
    else:
        return {'errors': ["Ability not found"]}


@ability_routes.errorhandler(500)
def internal_server_error(e):
    return {'errors': ["Internal Server Error"]}, 500