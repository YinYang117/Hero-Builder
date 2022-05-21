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

# # example: if good return normal, else return errors
# # so that we can catch those errors on the front end
# # form.errors come from using a Form() to validate or run custom functions
#     if current_user.is_authenticated:
#         return current_user.to_dict()
#     return {'errors': ['Unauthorized']}

#     if form.validate_on_submit():
#         return stuff
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@hero_abil_routes.route('/<int:id>', methods=["GET", "POST", "DELETE"])
def get_hero_abil(id):
    if request.methond == "GET":
        hero = Hero.query.get(id)
        currAbils = hero.hero_equipped_abilities
        heroAbils = {}
        for abil in currAbils:
            heroAbils[abil.id] = abil.to_js_obj
        return heroAbils

    if request.method == "POST":
        data = request.get_json(force=True)
        # data should look like {"abilId: 1"}
        abil_id = data["abilId"]
        hero = Hero.query.get(id)
        abil = Abil.query.get(abil_id)
        if hero and abil:
            hero.hero_equipped_abilities.append(abil)
        else:
            return {'error': ['Either Hero or Ability was not found']}
        db.session.commit()
        currAbils = hero.hero_equipped_abilities
        heroAbils = {}
        for abil in currAbils:
            heroAbils[abil.id] = abil.to_js_obj
        return heroAbils

    if request.method == "DELETE":
        data = request.get_json(force=True)
        # data should look like {"abilId: 1"}
        abil_id = data["abilId"]
        hero = Hero.query.get(id)
        abil = Abil.query.get(abil_id)
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