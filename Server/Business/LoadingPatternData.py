import pandas as pd
import os
import json

class LoadingPatternData:
    def __init__(self):
        pass

    def LoadPatternData(self, variable, timeInterval=None):
        """
        Load pattern data

        variable: 'Time', 'Calories', 'HR', 'Temperature', 'Steps' (one or multiple)
        timeInterval: (start, end)
        """

        fileName = "hour_of_day_grouping.csv"
        df = pd.read_csv('Data/' + fileName)

        if timeInterval == None:
            return df[variable]
        else:
            df['DateTime'] = pd.to_datetime(df['Time'])
            mask = (df['DateTime'] > timeInterval[0]) & (df['DateTime'] <= timeInterval[1])

            return df[variable].loc[mask]