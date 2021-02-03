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
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();

    var monthText = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month];
    var dayText =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];

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

    else if(format == "none"){
        return orgDate;
    }

}