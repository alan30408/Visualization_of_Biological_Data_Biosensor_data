#/***
# * @author Marco Schaefer 
# * @author Mathias Witte Paz
# *  
# ***/

#!flask/bin/python
from flask import Flask, render_template, redirect, url_for, request, jsonify
from random import randrange

from Business.LoadingGeneralData import LoadingGeneralData
loadingGeneralData = LoadingGeneralData()

from Business.LoadingCorrelatedData import LoadingCorrelatedData
loadingCorrelatedData = LoadingCorrelatedData()

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

@app.route('/LoadGeneralData') 
def LoadGeneralData():
    """
    http://127.0.0.1:5000/LoadGeneralData?vairable=Time&timeIntervalStart=2015-05-20%2019:00:00&timeIntervalEnd=2015-05-21%2019:00:00

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
        data = loadingGeneralData.LoadGeneralData(variables, (timeIntervalStart, timeIntervalEnd))
    #loading all data
    else:
        data = loadingGeneralData.LoadGeneralData(variables)
    return json.dumps({"data": json.loads(data.to_json(orient = "records"))})

@app.route('/LoadCorrelatedData') 
def LoadCorrelatedData():
    """
    http://127.0.0.1:5000/LoadCorrelatedData?variable=Time
    """
    variables = request.args.get('variables')

    variables = variables.split(",")
    
    if "Time" not in variables:
        variables.insert(0, "Time")
        
    data = loadingCorrelatedData.LoadCorrelatedData(variables)
    return data

# Momentarily with test data as I can't load data with LoadGeneralData
inputPath = r'Data/ChartsTest.csv'
testData = []
fields = ["Column1","Column2","Column3","Column4","Column5"]

with open(inputPath, encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf,fieldnames=fields)
    for i,rows in enumerate(csvReader):
        testData.append(rows)

@app.route('/barChart')
def barChart():
    return render_template('/bars.html', data = json.dumps(testData) )

@app.route('/lineChart')
def lineChart():
    return render_template('/lines.html', data = json.dumps(testData))

@app.route('/correlation')
def correlation():
    return render_template('/correlation.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000)