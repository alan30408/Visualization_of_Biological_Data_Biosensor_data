import pandas as pd
import json

class LoadingGeneralData:
    def LoadGeneralData(variable, timeInterval):
        """
        Load general data

        variable: 'Time', 'Calories', 'HR', 'Temperature', 'Steps' (one or multiple)
        timeInterval: (start, end)
        """

        fileName = "60min_v2.csv"
        df = pd.read_csv('../../Data/' + fileName)

        df['DateTime'] = pd.to_datetime(df['Time'])
        mask = (df['DateTime'] > timeInterval[0]) & (df['DateTime'] <= timeInterval[1])
        
        return df[variable].loc[mask]

#data = LoadingGeneralData.LoadGeneralData(["Time", "HR"], ("2015-05-20 19:00:00", "2015-05-21 19:00:00"))
#print(data)
#print({"data": json.dumps(json.loads(data.to_json(orient = "records")))})