function LoadBaseData(variables, timeIntervalStart, timeIntervalEnd)
{
    baseUrl = "http://127.0.0.1:5000/LoadGeneralData?";

    variablesUrl = "variables="+variables;
    timeIntervalStartUrl = "timeIntervalStart="+timeIntervalStart;
    timeIntervalEndUrl = "timeIntervalEnd="+timeIntervalEnd;

    url = baseUrl + variablesUrl + "&" + timeIntervalStartUrl + "&" + timeIntervalEndUrl;

    data = HttpGet(url);
    console.log(data);
    return JSON.parse(data);
}

function LoadCorrData(variables, timeIntervalStart, timeIntervalEnd) {
    baseUrl = "http://127.0.0.1:5000/LoadCorrelatedData?";

    variablesUrl = "variables="+variables;
    timeIntervalStartUrl = "timeIntervalStart="+timeIntervalStart;
    timeIntervalEndUrl = "timeIntervalEnd="+timeIntervalEnd;

    url = baseUrl + variablesUrl + "&" + timeIntervalStartUrl + "&" + timeIntervalEndUrl;

    data = HttpGet(url);
    console.log(data);
    return data;
}