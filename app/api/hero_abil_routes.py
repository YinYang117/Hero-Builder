from flask import Blueprint, request
from ..models import db, Hero, Ability

hero_abil_routes = Blueprint('hero_abil', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@hero_abil_routes.route('/<int:id>', methods=["GET", "POST", "DELETE"])
def get_hero_abil(id):
    if request.method == "GET":
        hero = Hero.query.get(id)
        currAbils = hero.hero_equipped_abilities
        heroAbils = {}
        for abil in currAbils:  
            heroAbils[abil.id] = abil.to_js_obj
        return heroAbils

    if request.method == "POST":
        abil_id = request.get_json(force=True)
        hero = Hero.query.get(id)
        abil = Ability.query.get(abil_id)
        if hero and abil:
            hero.hero_equipped_abilities.append(abil)
            print("--------------------------------- test 1", hero.hero_equipped_abilities)
            print("--------------------------------- test 2", len(hero.hero_equipped_abilities))
        else:
            return {'error': ['Either Hero or Ability was not found']}
        db.session.commit()
        return {abil_id: abil.to_js_obj}

    if request.method == "DELETE":
        abil_id = request.get_json(force=True)
        hero = Hero.query.get(id)
        abil = Ability.query.get(abil_id)
        if hero and abil:
            hero.hero_equipped_abilities.remove(abil)
        else:
            return {'error': ['Either Hero or Ability was not found']}
        db.session.commit()
        return {}


@hero_abil_routes.errorhandler(500)
def internal_server_error(e):
    return {'errors': ["Internal Server Error"]}, 500
# can also create one for 405 or any other.