function LoadBaseData(variables, timeIntervalStart=null, timeIntervalEnd=null)
{
    var baseUrl = "http://127.0.0.1:5000/LoadGeneralData?";

    var variablesUrl = "variables="+variables;
    if (timeIntervalStart===null){
        var url = baseUrl + variablesUrl;
    } else {
        var timeIntervalStartUrl = "timeIntervalStart="+timeIntervalStart;
        var timeIntervalEndUrl = "timeIntervalEnd="+timeIntervalEnd;

        var url = baseUrl + variablesUrl + "&" + timeIntervalStartUrl + "&" + timeIntervalEndUrl;
    }

    var data = HttpGet(url);
    return JSON.parse(data);
}

function LoadCorrData(variables) {
    var baseUrl = "http://127.0.0.1:5000/LoadCorrelatedData?";

    var variablesUrl = "variables="+variables;

    var url = baseUrl + variablesUrl;

    var data = HttpGet(url);
    return JSON.parse(data);;
}