import pandas as pd
import os
import json
import random
from datetime import datetime


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

        if timeInterval is not None:
            timeFrom = datetime.strptime(timeInterval[0], '%Y-%m-%d')
            timeTo = datetime.strptime(timeInterval[1], '%Y-%m-%d')
            
            elapsedTime = timeTo - timeFrom
            elapsedDays = elapsedTime.total_seconds() / 86400

            if elapsedDays > 31:
                fileName = "1week_v3.csv"

            elif elapsedDays > 7:
                fileName = "1day_v3.csv"

        df = pd.read_csv('Data/' + fileName)
        df['Time'] = pd.to_datetime(df['Time']) - pd.Timedelta(hours=8)

        if timeInterval is not None:
            if elapsedDays > 31:
                df['Calories'] = df['Calories'].apply(lambda x: x*60*24*7)
                df['Steps'] = df['Steps'].apply(lambda x: x*60*24*7)
            elif elapsedDays > 7:
                df['Calories'] = df['Calories'].apply(lambda x: x*60*24)
                df['Steps'] = df['Steps'].apply(lambda x: x*60*24)
            else:    
                df['Calories'] = df['Calories'].apply(lambda x: x*60)
                df['Steps'] = df['Steps'].apply(lambda x: x*60)
        else:    
            df['Calories'] = df['Calories'].apply(lambda x: x*60)
            df['Steps'] = df['Steps'].apply(lambda x: x*60)


        min_values = {}
        max_values = {}
        average_values = {}
        if timeInterval == None:
            return df[variable]
        else:
            mask = (df['Time'] > timeInterval[0]) & (df['Time'] <= timeInterval[1])

            for i in variable[1:]:
                s = pd.Series(df[i].loc[mask])
                min_values[i] = s.min()
                max_values[i] = s.max()
                average_values[i] = s.mean()
            data = [df[variable].loc[mask], min_values, max_values, average_values]
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
        home_val = {}
        data_length = len(data)
        random_num = random.randint(0,data_length)
        for i in variables[0:]:
            s = pd.Series(data[i])[random_num:random_num+24]
            if i == "Steps":
                home_val[i] = int(s.sum())
            elif i == "Time":
                home_val[i] = "from "+ pd.Series(data[i])[random_num].strftime("%w %b %Y") + " to "+ pd.Series(data[i])[random_num+24].strftime("%w %b %Y")
            elif i == "Calories":
                home_val[i] = "%2f" % s.sum()
            else:
                home_val[i] = "%.2f" % s.mean()
        return json.dumps(home_val)

    def LoadDailyData(self):
        fileName = "1day_v3.csv"
        df = pd.read_csv('Data/' + fileName)

        df['Time'] = pd.to_datetime(df['Time'])
        [dt.date() for dt in df['Time']]


        df['Calories'] = df['Calories'].apply(lambda x: x*60*24)
        df['Steps'] = df['Steps'].apply(lambda x: x*60*24)

        return df