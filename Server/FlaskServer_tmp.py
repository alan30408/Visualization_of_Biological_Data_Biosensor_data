#/***
# * @author Marco Schaefer 
# * @author Mathias Witte Paz
# *  
# ***/

#!flask/bin/python
from flask import Flask, render_template, redirect, url_for
from random import randrange
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

@app.route('/histogram')
def histogram():
    d = {"numbers" : []}
    
    for _ in range(1000):
        d["numbers"].append(randrange(101))
       
    return render_template('www/HTML/histogram.html', data=json.dumps(d))

@app.route('/dummy')
def dummy():
    return render_template('www/HTML/dummy.html')

@app.route('/bubbleChart')
def bubbleChart():
    df_cars_trucks_and_buses_per_1000_persons = pd.read_csv('../Data/tmp/cars_trucks_and_buses_per_1000_persons.csv')
    df_roads_paved_percent_of_total_roads = pd.read_csv('../Data/tmp/roads_paved_percent_of_total_roads.csv')
    df_traffic_deaths_per_100000_people = pd.read_csv('../Data/tmp/traffic_deaths_per_100000_people.csv')

    with open('../Data/tmp/country-by-continent.json') as json_file:
        json_country_by_continent = json.load(json_file)

    data = {"cars_trucks_and_buses_per_1000_persons": json.dumps(json.loads(df_cars_trucks_and_buses_per_1000_persons.to_json(orient = "records"))),
            "roads_paved_percent_of_total_roads" : json.dumps(json.loads(df_roads_paved_percent_of_total_roads.to_json(orient = "records"))),
            "traffic_deaths_per_100000_people" : json.dumps(json.loads(df_traffic_deaths_per_100000_people.to_json(orient = "records"))),
            "country_by_continent": json_country_by_continent }

    return render_template('www/HTML/bubbleChart.html', data=data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
