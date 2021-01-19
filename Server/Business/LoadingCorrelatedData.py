import pandas as pd
import os
import json
from Business.LoadingGeneralData import LoadingGeneralData

class LoadingCorrelatedData:
    def __init__(self):
        pass

    def LoadCorrelatedData(self, variables):

        data = LoadingGeneralData().LoadGeneralData(variables)
        x_values = []
        y_values = []
        data = json.loads(data.to_json(orient = "records"))
        print(data)
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