In each new version that's created I need to post 

SCHEMA = os.environ.get("SCHEMA")

and 

if environment == "production":
        op.execute(f"ALTER TABLE ***insert table name here*** SET SCHEMA {SCHEMA};")

for every table
