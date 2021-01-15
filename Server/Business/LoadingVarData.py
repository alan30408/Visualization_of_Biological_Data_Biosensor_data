import pandas as pd
import os
import json

class LoadingVarData:
    def __init__(self):
        pass

    def LoadGeneralData(self, variable, timeInterval=None):
        """
        Load general data

        variable: 'Time', 'Calories', 'HR', 'Temperature', 'Steps' (one or multiple)
        timeInterval: (start, end)
        """

        fileName = "60min_v3.csv"
        df = pd.read_csv('Data/' + fileName)

        if timeInterval == None:
            return df[variable]
        else:
            df['DateTime'] = pd.to_datetime(df['Time'])
            mask = (df['DateTime'] > timeInterval[0]) & (df['DateTime'] <= timeInterval[1])

            return df[variable].loc[mask]

    def LoadCorrelatedData(self, variables):

        data = LoadingVarData().LoadGeneralData(variables)
        x_values = []
        y_values = []
        data = json.loads(data.to_json(orient = "records"))
        xyData = []

        for i in data:
            xyData.append((i[variables[1]], i[variables[2]]))
            x_values.append(i[variables[1]])
            y_values.append(i[variables[2]])
        
        x = pd.Series(x_values)
        y = pd.Series(y_values)
        r = x.corr(y)

        ret_data = {
            "data" : xyData,
            "max_x" : max(x),
            "max_y" : max(y),
            "r_value" : r,
         }
        return json.dumps(ret_data)