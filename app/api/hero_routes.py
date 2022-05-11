from flask import Blueprint, jsonify, session, request, render_template
from ..models import User, Hero, db
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


@hero_routes.route('/user/:id', methods=['GET', 'POST'])
def heros():
    """
    Main route for getting all a User's Heros, and Hero creation.
    """
    if request.method == "GET":
        heros = Hero.query.filter(Hero.owner_id == id).all()
        all_heros = {"shouldSeeThisKey": "AndThisValue"}
        for hero in heros:
            all_heros[hero.id] = hero.to_js_obj
        return all_heros

    if request.method == "POST":
        form = EditHero()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            hero = form.populate_obj(Hero)
            hero.owner_id = id
            db.session.add(hero)
            db.session.commit()
            return hero.to_js_obj
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@hero_routes.route('/:id', methods=['GET', 'PUT', 'DELETE'])
def specific_hero():
    """
    Main route for getting, editing, and deleting a Hero.
    """
    hero = Hero.query.get(id)
    if hero:
        if request.method == "GET":
            return hero.to_js_obj
        
        if request.method == "PUT":
            form = EditHero
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                form.populate_obj(hero)
                updt = date.today()
                hero.updated_at = updt
                db.session.add(hero)
                db.session.commit()
                return hero.to_js_obj
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 401

        if request.method == "DELETE":
            data = request.get_json(force=True) # passing userId
            if hero.owner_id == data["userId"]:
                db.session.delete(hero)
                db.session.commit()
                return {'deletion': 'successful'}
            else:
                return {'errors': ['User Id passed did not match Hero owner.']}
    else:
        return {}
