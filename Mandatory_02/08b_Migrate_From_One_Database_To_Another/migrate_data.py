from source import Source
from target import Target

# Source SQLite database connection
source_db = Source('sqlite:///source.db')

# Target PostgreSQL database connection
target_db = Target('postgresql+psycopg2://username:password@localhost:5432/targetdb')

# List of tables to migrate
tables_to_migrate = ['users', 'products', 'orders', 'order_items']

# Migrate each table
for table in tables_to_migrate:
    df = source_db.read_table(table)
    target_db.write_table(table, df)

print("Data migration completed successfully")
