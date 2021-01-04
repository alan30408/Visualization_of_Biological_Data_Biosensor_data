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

import pandas as pd
import json

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
    
@app.route('/testing')
def testing():
    return render_template('testing.html')

@app.route('/LoadGeneralData') 
def LoadGeneralData():
    """
    http://127.0.0.1:5000/LoadGeneralData?vairable=Time&timeIntervalStart=2015-05-20%2019:00:00&timeIntervalEnd=2015-05-21%2019:00:00

    time format: "YYYY-MM-DD HH:MM:SS"
    """
    variables = request.args.get('variables')
    timeIntervalStart = request.args.get('timeIntervalStart')
    timeIntervalEnd = request.args.get('timeIntervalEnd')

    variables = variables.split(",")
    
    if "Time" not in variables:
        variables.insert(0, "Time")
        
    data = loadingGeneralData.LoadGeneralData(variables, (timeIntervalStart, timeIntervalEnd))
    return jsonify({"data": json.dumps(json.loads(data.to_json(orient = "records")))})

if __name__ == '__main__':
    app.run(debug=True, port=5000)