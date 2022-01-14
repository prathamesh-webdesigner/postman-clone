console.log('Postman Clone');

// Utility Functions 
// 1. Utility function to get DOM Elelment from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize numbers of parameters 
let addedParamCount = 0;

// // 1. Utility function to get DOM Elelment from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';
let requestJsonBox = document.getElementById('requestJsonBox');
requestJsonBox.style.display = 'none';

// If user clicks on json box, hide the params box 
let jsoRadio = document.getElementById('jsonRadio');
jsoRadio.addEventListener('click', () => {
    parametersBox.style.display = 'none';
    requestJsonBox.style.display = 'block';

});

// If user clicks on Params box, hide the json box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = 'block';
    requestJsonBox.style.display = 'none';

});

// If the user clicks on + button, Add more parameters 
let addParam = document.getElementById('addParams');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row my-3">
                    <label class="col-form-label col-sm-2">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="ParameterKey${addedParamCount + 2}" placeholder="Enter Parameter key ${addedParamCount + 2}">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary col-sm-2 deleteParam" style="width: 3%;">-</button>
                </div>`;
    // Convert the Element string to DOM node 
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listner to remove the parameter on clicking  - button 
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

    addedParamCount++;
});

// If the use click on Submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the Response box to request patience from the user 
    // document.getElementById('responseJsonText').value = 'Please wait.. Fetching response..';
    document.getElementById('responsePrism').innerHTML = 'Please wait.. Fetching response..';


    // Fetch all the values user has entered 
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used params option instead of json, collect all the parameters in an object 
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('ParameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('ParameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the value in the console for debugging 
    console.log('url is : ', url);
    console.log('requestType is : ', requestType);
    console.log('contentType is : ', contentType);
    console.log('Data is : ', data);

    // If the request type is GET, invoke fetch API to create a GET request  
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }

});
