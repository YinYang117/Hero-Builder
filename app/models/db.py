from flask_sqlalchemy import SQLAlchemy

#add import and set variable to access flask environment
import os
environment = os.getenv("FLASK_ENV")

db = SQLAlchemy()

#add a prefix to table names in production environment only
def add_prefix_for_prod(attr):
    if environment == "production":
        return "hero_builder_schema" + "." + attr
    else:
        return attr
