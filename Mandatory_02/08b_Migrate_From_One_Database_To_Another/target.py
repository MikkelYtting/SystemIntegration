
from sqlalchemy import create_engine

class Target:
    def __init__(self, connection_string):
        self.engine = create_engine(connection_string)
    
    def write_table(self, table_name, dataframe):
        dataframe.to_sql(table_name, self.engine, if_exists='replace', index=False)
        print(f"Table {table_name} migrated successfully")
