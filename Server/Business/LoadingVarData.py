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

        min_values = {}
        max_values = {}
        average_values = {}
        if timeInterval == None:
            return df[variable]
        else:
            df['DateTime'] = pd.to_datetime(df['Time'])
            mask = (df['DateTime'] > timeInterval[0]) & (df['DateTime'] <= timeInterval[1])

            for i in variable[1:]:
                s = pd.Series(df[i].loc[mask])
                min_values[i] = s.min()
                max_values[i] = s.max()
                average_values[i] = s.mean()
            data = [df[variable].loc[mask], min_values, max_values, average_values]
            print(data)
            return data

    def LoadCorrelatedData(self, variables):

        data = LoadingVarData().LoadGeneralData(variables)
        x_values = []
        y_values = []
        data = json.loads(data.to_json(orient = "records"))
        xyData = []

        for i in data:
            if i[variables[1]] == None or i[variables[2]] == None:
                continue
            else:
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

    def LoadHomeData(self, variables):
        data = LoadingVarData().LoadGeneralData(variables)
        #data = json.loads(data.to_json(orient = "records"))
        home_val = {}
        print(data)
        for i in variables[1:]:
            s = pd.Series(data[i])
            if i == "Steps":
                home_val[i] = int(s.sum())
            else:
                home_val[i] = "%.2f" % s.mean()
        return json.dumps(home_val)
