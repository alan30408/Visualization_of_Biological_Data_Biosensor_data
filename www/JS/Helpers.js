/* Project Biosensors - Jenko Schneider Stickel Tung */

function HttpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function GetVariablesAndDates() {
    var variables = [];

    var checkboxCalories = document.getElementById('checkboxCalories');
    var checkboxHR = document.getElementById('checkboxHR');
    var checkboxTemperature = document.getElementById('checkboxTemperature');
    var checkboxSteps = document.getElementById('checkboxSteps');

    var dateStart = document.getElementById('dateStart').value;
    var dateEnd = document.getElementById('dateEnd').value;


    if (checkboxCalories.checked) {
        variables.push(checkboxCalories.value);
    }

    if (checkboxHR.checked) {
        variables.push(checkboxHR.value);
    }

    if (checkboxTemperature.checked) {
        variables.push(checkboxTemperature.value);
    }

    if (checkboxSteps.checked) {
        variables.push(checkboxSteps.value);
    }
    return [variables, dateStart, dateEnd];
}

function GetVariableAndDates() {
    var variable = document.querySelector('input[name="variable"]:checked').value;
    var dateStart = document.getElementById('dateStart').value;
    var dateEnd = document.getElementById('dateEnd').value;

    return [variable, dateStart, dateEnd];
}

function GetVariable() {
    var variable = document.querySelector('input[name="variable"]:checked').value;
    return variable;
}

function DateToString(date, format){
    var orgDate = date;
    var date = new Date(date);
    date.setHours(date.getHours() - 3);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate() + 1;
    var hour = date.getHours();

    var monthText = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month];
    var dayText =["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];

    if(format == "withHour"){
        return day + " " + monthText + " " + hour + "h";
    }
    else if(format == "monthDay")
    {
        return day + " " + monthText + " " + year;
    }
    else if (format == "monthYear")
    {
        return monthText + " " + year;
    }
    else if (format == "day")
    {
        return day;
    }
    else if(format = "getParameter")
    {
        return year + "-" + pad(month, 2) + "-" + pad(day, 2);
    }
    else if(format == "none"){
        return orgDate;
    }

}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }