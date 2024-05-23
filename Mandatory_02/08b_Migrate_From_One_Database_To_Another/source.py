
import pandas as pd
from sqlalchemy import create_engine

class Source:
    def __init__(self, connection_string):
        self.engine = create_engine(connection_string)
    
    def read_table(self, table_name):
        return pd.read_sql_table(table_name, self.engine)
