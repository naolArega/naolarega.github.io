const inputField = document.querySelector('.input');
const outputField = document.querySelector('.output');
const processBtn = document.querySelector('.process');
const copyToclipboardBtn = document.querySelector('.copy-to-clipboard');

let finalJsonData = null;

processBtn.addEventListener('click', event => {
    process();
});

copyToclipboardBtn.addEventListener('click', event => {
    copyToClipboard();
});

function process() {
    let processedEntries = [];
    let finalObject = {};
    let parsedJson = parseJson(inputField.value);
    if (!parsedJson) return;

    let entries = Object.entries(parsedJson);

    entries.map(entry => {
        entry[1] = entry[0];
        processedEntries.push(entry);
    });

    finalObject = Object.fromEntries(processedEntries);
    stringJson = JSON.stringify(finalObject);
    outputField.value = finalJsonData = stringJson;
    console.log('json value :: ', stringJson);
}

function parseJson(jsonData) {
    try {
        return JSON.parse(jsonData);
    }
    catch (e) {
        alert('Unable to parse json data please check the format!');
        console.error('error parsing json :: ', e);
        return false;
    }
}

function copyToClipboard() {
    if (finalJsonData !== null) {
        if (navigator['clipboard']) {
            navigator.clipboard.writeText(finalJsonData);
        }
        else {
            alert('Error copying to clipboard');
        }
    }
    else {
        alert('No data to copy to clipboard, parse a json first');
    }
}