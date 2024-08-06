from source import Source
from target import Target

# Initialiser source- og target databaser
source_db = Source()
target_db = Target()

# Liste over tabeller, der skal migreres
tables_to_migrate = ['users', 'products', 'orders', 'order_items']

# Migrer hver tabel
for table in tables_to_migrate:
    df = source_db.read_table(table)
    target_db.write_table(table, df)

# Bekræft færdiggørelsen af databasemigrering
print("Data migration completed successfully")
