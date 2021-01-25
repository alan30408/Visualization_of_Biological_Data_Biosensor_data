import pandas as pd
import os
import json

class LoadingPatternData:
    def __init__(self):
        pass

    def LoadPatternData(self, variable):
        """
        Load pattern data

        variable: 'Time', 'Calories', 'HR', 'Temperature', 'Steps' (one)
        """

        fileName = "hour_of_day_grouping.csv"
        df = pd.read_csv('Data/' + fileName)

        return df[["Time", variable]]