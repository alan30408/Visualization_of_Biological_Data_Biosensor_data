import pandas as pd
import os
import json
from Business.LoadingGeneralData import LoadingGeneralData

class LoadingCorrelatedData:
    def __init__(self):
        pass

    def LoadCorrelatedData(self, variables, timeInterval):

        data = LoadingGeneralData().LoadGeneralData(variables, timeInterval)
        x_values = []
        y_values = []
        data = json.loads(data.to_json(orient = "records"))
        for i in data:
            x_values.append(i[variables[1]])
            y_values.append(i[variables[2]])
        x = pd.Series(x_values)
        y = pd.Series(y_values)
        r = x.corr(y)
        ret_data = {
            "x_values" : x_values,
            "y_values" : y_values,
            "r_value" : r,
         }
        return json.dumps(ret_data)