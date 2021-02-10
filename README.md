# Visualization of Biological Data - Biosensor data

<!-- Describe your project in brief -->
This is the project work of Jaka Jenko, Elisabeth Schneider, Tyra Stickel and Alan Tung. The given biosensor data (consisting of the variables "Time", "Calories", "Steps", "Heart Rate" and "Temperature") should be visualized.


# Installation and usage

To use this project, first clone the repo on your device using the command below:

```git init```

```git clone https://github.com/JakaJenko/Visualization_of_Biological_Data_Biosensor_data.git```

In the corresponding folder start the application by the command:

```python3 Server/FlaskServer.py```

Afterwards open the [website](http://127.0.0.1:5000/home). You will reach the homepage of the project.

Via the menu different subpages can be visited which have different functionalities. General Information can be seen (selection of different parameters is possible), the correlation between two variables and also pattern can be visualized. Just explore the project work via visiting the different websites.


# Structure of Webpage

## Home

On the homepage the user should be motivated to explore the data. The steps, average heart rate and burnt calories of one randomly chosen day can be seen.

## General information

This subpage shows the data of one chosen variable. The time span, in which the data should be investigated, can be chosen. Dependingly on the length of the time span, the plots are modified to make trends easier detectable. In each graph the average value of the time span is shown by a drawn line.

## Correlated data

On this page it is possible to correlate two variables to each other. The result is shown in a plot. Additional information is giving by the use of a heatmap, so the distribution of values can be seen very clear. The correlation coefficient is also displayed.

## Pattern data

For the plots showed on this page, all available data is taken into account to display certain patterns. The data is used to identify the average values for the given hour of the day for one variable. The main aim is showing when the user is more active on the day or showing trends of the variables at a certain time.