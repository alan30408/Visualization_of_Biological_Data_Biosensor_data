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