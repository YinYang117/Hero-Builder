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


@hero_abil_routes.route('/hero/:id', methods=["GET"])
def get_hero_abil():
    # data = request.get_json(force=True)
    # tripId = data["tripId"]
    # user = User.query.filter(User.username == data["userName"]).one()
    # if user:
    #     return {
    #         "invitedUser": user.to_dict(), "tripId": tripId
    #     }
    # else:
    #     return {
    #         "errors" : ["This user does not exist. Please type an existing user."]
    #     }
