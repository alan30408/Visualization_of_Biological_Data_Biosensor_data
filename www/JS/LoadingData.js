function LoadBaseData(variables, timeIntervalStart, timeIntervalEnd)
{
    var baseUrl = "http://127.0.0.1:5000/LoadGeneralData?";

    var variablesUrl = "variables="+variables;
    var timeIntervalStartUrl = "timeIntervalStart="+timeIntervalStart;
    var timeIntervalEndUrl = "timeIntervalEnd="+timeIntervalEnd;

    var url = baseUrl + variablesUrl + "&" + timeIntervalStartUrl + "&" + timeIntervalEndUrl;

    var data = HttpGet(url);
    return JSON.parse(data);
}

function LoadCorrData(variables, timeIntervalStart, timeIntervalEnd) {
    var baseUrl = "http://127.0.0.1:5000/LoadCorrelatedData?";

    var variablesUrl = "variables="+variables;
    var timeIntervalStartUrl = "timeIntervalStart="+timeIntervalStart;
    var timeIntervalEndUrl = "timeIntervalEnd="+timeIntervalEnd;

    var url = baseUrl + variablesUrl + "&" + timeIntervalStartUrl + "&" + timeIntervalEndUrl;

    var data = HttpGet(url);
    return data;
}