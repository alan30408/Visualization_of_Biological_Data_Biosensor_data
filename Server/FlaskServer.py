#/***
# * @author Marco Schaefer 
# * @author Mathias Witte Paz
# *  
# ***/

#!flask/bin/python
from flask import Flask, render_template, redirect, url_for, request
from random import randrange

from .Business.LoadingGeneralData import LoadingGeneralData

import pandas as pd
import json

import os
import sys

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def index():
    return redirect(url_for('base'))

@app.route('/base')
def base():
    return render_template('base.html')

@app.route('/LoadGeneralData', methods=['POST']) 
def foo():
    """
    time format: "YYYY-MM-DD HH:MM:SS"
    """
    variable = request.args.get('variable')
    timeIntervalStart = request.args.get('timeIntervalStart')
    timeIntervalEnd = request.args.get('timeIntervalEnd')

    data =  LoadingGeneralData.LoadGeneralData(variable, (timeIntervalStart, timeIntervalEnd))
    return {"data": json.dumps(json.loads(data.to_json(orient = "records")))}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
