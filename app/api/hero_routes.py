from flask import Blueprint, jsonify, session, request, render_template
from ..models import User, Hero, db, hero_abilities, Ability
from ..forms import NewHero, EditHero
from datetime import date

hero_routes = Blueprint('heros', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
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


@hero_routes.route('/all', methods=['GET'])
def all_heros():
    """
    Returns all Heros. Requires User be logged in with main Admin account. Intended for backend use only.
    """
    data = request.get_json(force=True)
    if data["userId"] == 1:
    # if data["user.id"] == 1:
        heros = Hero.query.all()
        all_heros = {}
        for hero in heros:
            all_heros[hero.id] = hero.to_js_obj
        return all_heros
    else:
        return {}


@hero_routes.route('/', methods=['POST'])
def hero_creation():
    """
    Main route for New Heros.
    """
    form = NewHero()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        hero = Hero(
            owner_id = form.data["ownerId"],
            name = form.data["name"],
            intro = form.data["intro"],
            hero_image = form.data["heroImage"],
            hp = form.data["hp"],
            resource = form.data["resource"],
            resource_name = form.data["resourceName"],
            resource_amount = form.data["resourceAmount"],
            physical_armor = form.data["physicalArmor"],
            magic_resist = form.data["magicResist"],
            attack_damage = form.data["attackDamage"],
            attack_range = form.data["attackRange"],
            attack_speed = form.data["attackSpeed"],
            move_speed = form.data["moveSpeed"],
            # num_of_abilities = form.data["numOfAbilities"],
            details = form.data["details"],
        )
        db.session.add(hero)
        db.session.commit()
        return hero.to_js_obj
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
            

@hero_routes.route('/user/<int:id>', methods=['GET'])
def heros(id):
    """
    Main route for getting all a User's Heros.
    """
    heros = Hero.query.filter(Hero.owner_id == id).all()
    all_heros = {}
    for hero in heros:
        all_heros[hero.id] = hero.to_js_obj
    return all_heros


@hero_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def specific_hero(id):
    """
    Main route for getting, editing, and deleting a Hero.
    """
    hero = Hero.query.get(id)
    if hero:
        if request.method == "GET":
            return hero.to_js_obj
        
        if request.method == "PUT":
            form = EditHero()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                hero.name = form.data["name"]
                hero.intro = form.data["intro"]
                hero.hero_image = form.data["heroImage"]
                hero.hp = form.data["hp"]
                hero.resource = form.data["resource"]
                hero.resource_name = form.data["resourceName"]
                hero.resource_amount = form.data["resourceAmount"]
                hero.physical_armor = form.data["physicalArmor"]
                hero.magic_resist = form.data["magicResist"]
                hero.attack_damage = form.data["attackDamage"]
                hero.attack_range = form.data["attackRange"]
                hero.attack_speed = form.data["attackSpeed"]
                hero.move_speed = form.data["moveSpeed"]
                # hero.num_of_abilities = form.data["numOfAbilities"]
                hero.details = form.data["details"]

                # updt = date.today()
                # hero.updated_at = updt

                db.session.add(hero)
                db.session.commit()
                return hero.to_js_obj
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 401

        if request.method == "DELETE":
            db.session.delete(hero)
            db.session.commit()
            return {'deletion': 'successful'}

    else:
        return {"errors": ['Hero not found']}


@hero_routes.errorhandler(500)
def internal_server_error(e):
    return {"errors": ["Internal Server Error"]}, 500
