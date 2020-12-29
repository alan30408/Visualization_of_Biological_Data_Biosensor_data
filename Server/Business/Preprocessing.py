from dateutil import parser
import pandas as pd

def PreprocessData():
    
    df = pd.read_csv('../../Data/Biosensors.csv')
    df['Time'] = pd.to_datetime(df['Time'], format='%Y-%m-%dT%H:%M:%SZ')
    df = df.set_index("Time")
    print(df)

    allDates = pd.date_range('20.5.2015 18:54', '30.03.2016 00:00', freq="min")
    dfTmp = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])

    a = 0
    lenDates = len(allDates)

    for date in allDates:
        if a%100 == 0:
            print(a, " / ", lenDates)

        try:
            row = df.loc[date]
            dfTmp = dfTmp.append(pd.DataFrame([[date, row.Calories, row.HR, row.Temperature, row.Steps]], columns
=dfTmp.columns))
        except:
            dfTmp = dfTmp.append(pd.DataFrame([[date, 0, 0, 0, 0]], columns
=dfTmp.columns))

        a += 1
    
    print(dfTmp)
    dfTmp.to_csv('../../Data/biosensorWithAllData_v2.csv')
    #df = dfTmp
    
    df = pd.read_csv('../../Data/biosensorWithAllData_v2.csv')
    print(df)
    
    lenDf = len(df)


    df15 = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])
    df30 = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])
    df60 = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])

    df15tmp = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])
    df30tmp = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])
    df60tmp = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])

    start15 = parser.parse(df.Time[0])
    start30 = parser.parse(df.Time[0])
    start60 = parser.parse(df.Time[0])

    for index, row in df.iterrows():
        if index%100 == 0:
            print(index, " / ", lenDf)

        #if index>0 and index%1000 == 0:
        #    break

        currentTime = parser.parse(row.Time)

        if (currentTime - start15).total_seconds() / 60.0 > 15:  #15 min interval
            df15tmpMean = df15tmp.mean()
            df15 = df15.append(pd.DataFrame([[start15, df15tmpMean.Calories, df15tmpMean.HR, df15tmpMean.Temperature, df15tmpMean.Steps]], columns
=df15.columns))

            start15 = currentTime
            df15tmp = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])

        df15tmp = df15tmp.append(pd.DataFrame([[row.Time, row.Calories, row.HR, row.Temperature, row.Steps]], columns
=df15tmp.columns))


        if (currentTime - start30).total_seconds() / 60.0 > 30:  #30 min interval
            df30tmpMean = df30tmp.mean()
            df30 = df30.append(pd.DataFrame([[start30, df30tmpMean.Calories, df30tmpMean.HR, df30tmpMean.Temperature, df30tmpMean.Steps]], columns
=df30.columns))

            start30 = currentTime
            df30tmp = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])

        df30tmp = df30tmp.append(pd.DataFrame([[row.Time, row.Calories, row.HR, row.Temperature, row.Steps]], columns
=df30tmp.columns))


        if (currentTime - start60).total_seconds() / 60.0 > 60:  #60 min interval
            df60tmpMean = df60tmp.mean()
            df60 = df60.append(pd.DataFrame([[start60, df60tmpMean.Calories, df60tmpMean.HR, df60tmpMean.Temperature, df60tmpMean.Steps]], columns
=df60.columns))

            start60 = currentTime
            df60tmp = pd.DataFrame(columns=["Time", "Calories", "HR", "Temperature", "Steps"])

        df60tmp = df60tmp.append(pd.DataFrame([[row.Time, row.Calories, row.HR, row.Temperature, row.Steps]], columns
=df60tmp.columns))

    df15.to_csv('../../Data/15min.csv')
    df30.to_csv('../../Data/30min.csv')
    df60.to_csv('../../Data/60min.csv')


#PreprocessData()