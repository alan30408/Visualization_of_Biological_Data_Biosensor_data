function LoadData(variables,timeIntervalStart=null, timeIntervalEnd=null, method=null) {
    var baseUrl = "http://127.0.0.1:5000/LoadVarData?";

    var variablesUrl = "variables="+variables;
    var url = baseUrl + variablesUrl;
    if (method != null) {
        url += "&method="+method;
    }
    if (timeIntervalStart===null){
        var data = HttpGet(url);
        //console.log(data);
        return JSON.parse(data);
    } else {
        var timeIntervalStartUrl = "timeIntervalStart="+timeIntervalStart;
        var timeIntervalEndUrl = "timeIntervalEnd="+timeIntervalEnd;

        url += "&" + timeIntervalStartUrl + "&" + timeIntervalEndUrl;
        var data = HttpGet(url);
        //console.log(data);
        return JSON.parse(data);
    }
}

function LoadPatternData(variable)
{
    var baseUrl = "http://127.0.0.1:5000/LoadPatternData?";
    var data = "variable=" + variable;

    url = baseUrl + data;

    var data = HttpGet(url);
    return JSON.parse(data);
}