#/***
# * @author Marco Schaefer 
# * @author Mathias Witte Paz
# *  
# ***/

#!flask/bin/python
from flask import Flask, render_template, redirect, url_for, request, jsonify
from random import randrange

from Business.LoadingVarData import LoadingVarData
loadingVarData = LoadingVarData()

from Business.LoadingPatternData import LoadingPatternData
loadingPatternData = LoadingPatternData()

import pandas as pd
import json
import csv

import os
import sys

APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(APP_PATH)
TEMPLATE_PATH = os.path.join(APP_PATH, 'www/HTML/')
STATIC_PATH = os.path.join(APP_PATH, 'www/')
print(TEMPLATE_PATH)

app = Flask(__name__, template_folder=TEMPLATE_PATH, static_folder=STATIC_PATH)
app.config['DEBUG'] = True

@app.route('/')
def index():
    return redirect(url_for('base'))

@app.route('/base')
def base():
    return render_template('base.html')
    
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/testing')
def testing():
    return render_template('testing.html')

@app.route('/generalData')
def generalData():
    return render_template('generalData.html')

@app.route('/correlatedData')
def correlatedData():
    return render_template('correlatedData.html')

@app.route('/patternData')
def patternData():
    return render_template('patternData.html')

@app.route('/LoadVarData') 
def LoadVarData():
    """
    http://127.0.0.1:5000/LoadVarData?variable=Time&timeIntervalStart=2015-05-20%2019:00:00&timeIntervalEnd=2015-05-21%2019:00:00&method=correlation

    time format: "YYYY-MM-DD HH:MM:SS"
    """
    variables = request.args.get('variables')
    variables = variables.split(",")
    
    if "Time" not in variables:
        variables.insert(0, "Time")
    #an interval is given
    if request.args.get('timeIntervalStart'):
        timeIntervalStart = request.args.get('timeIntervalStart')
        timeIntervalEnd = request.args.get('timeIntervalEnd')
        data = loadingVarData.LoadGeneralData(variables, (timeIntervalStart, timeIntervalEnd))
        return json.dumps({"data": json.loads(data[0].to_json(orient = "records")), "min": data[1], "max": data[2], "avg": data[3]})
    #load data for correlation
    elif request.args.get('method') == "correlation":
        data = loadingVarData.LoadCorrelatedData(variables)
        return data
    elif request.args.get('method') == "home":
        data = loadingVarData.LoadHomeData(variables)
        return data
    elif request.args.get('method') == "pattern":
        data = loadingPatternData.LoadPatternData(variables)
        return data
    #loading all data
    else:
        data = loadingVarData.LoadGeneralData(variables)
        return json.dumps({"data": json.loads(data[0].to_json(orient = "records")), "min": data[1], "max": data[2], "avg": data[3]})


@app.route('/LoadPatternData')
def LoadPatternData():
    variable = request.args.get('variable')

    data = loadingPatternData.LoadPatternData(variable)
    return json.dumps({"data": json.loads(data.to_json(orient = "records"))})


@app.route('/LoadDailyData')
def LoadDailyData():
    data = loadingVarData.LoadDailyData()
    return json.dumps({"data": json.loads(data.to_json(orient = "records"))})


@app.route('/barChart')
def barChart():
    return render_template('/bars.html' )

@app.route('/lineChart')
def lineChart():
    return render_template('/lines.html')

@app.route('/correlation')
def correlation():
    return render_template('/correlation.html')

@app.route('/pattern')
def pattern():
    return render_template('/pattern.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000)