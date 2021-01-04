import pandas as pd
import os
import json

class LoadingGeneralData:
    def __init__(self):
        pass

    def LoadGeneralData(self, variable, timeInterval):
        """
        Load general data

        variable: 'Time', 'Calories', 'HR', 'Temperature', 'Steps' (one or multiple)
        timeInterval: (start, end)
        """

        fileName = "60min_v2.csv"
        df = pd.read_csv('Data/' + fileName)

        df['DateTime'] = pd.to_datetime(df['Time'])
        mask = (df['DateTime'] > timeInterval[0]) & (df['DateTime'] <= timeInterval[1])

        return df[variable].loc[mask]