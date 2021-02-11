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
        df["Time"] = (df["Time"] + (24-8)) % 24
        df = df.sort_values(by=['Time'])

        df['Calories'] = df['Calories'].apply(lambda x: x*60)
        df['Steps'] = df['Steps'].apply(lambda x: x*60)

        min_values = {}
        max_values = {}
        average_values = {}

        s = pd.Series(df[variable])
        min_values[variable] = s.min()
        max_values[variable] = s.max()
        average_values[variable] = s.mean()

        data = [df[["Time", variable]], min_values, max_values, average_values]
        return data

        #return df[["Time", variable]]