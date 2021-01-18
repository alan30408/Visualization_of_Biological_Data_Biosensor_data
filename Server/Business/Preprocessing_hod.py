# Project Biosensors
# This file extracts the averaged counts of the features for each hour of the day from the file 60min_v3.csv

import csv
import time
from time import mktime
from datetime import datetime

result = {}

with open('60min_v3.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        if row[2]: # Filter out rows with missing values
            # Extract hour of day (hod) from date
            date_time_obj = datetime.strptime(row[1], '%Y-%m-%d %H:%M:%S')
            hod = date_time_obj.hour
            # fill dict for key hod
            if hod in result: # hour already a key
                counter = float(result.get(hod)[0]) + 1
                newCal = float(result.get(hod)[1]) + float(row[2]) 
                newHR = float(result.get(hod)[2]) + float(row[3])
                newTemp = float(result.get(hod)[3]) + float(row[4])
                newSteps = float(result.get(hod)[4]) + float(row[5])
                result[hod] = [counter, newCal,newHR, newTemp, newSteps]
            else: # initialize new hour key with counter = 1 and row entries as values
                result[hod] = [1,float(row[2]),float(row[3]),float(row[4]),float(row[5])]

print("Hour,", "Calories,", "HR,", "Temperature,", "Steps")
for key in result:
    count = result[key][0] # entries per hour
    Cal = result[key][1] / count
    HR = result[key][2] / count
    Temp =result[key][3] / count
    Steps = result[key][4] / count
    print(key,",",Cal, ",",HR, ",",Temp,",", Steps)