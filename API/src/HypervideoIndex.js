function includeJs(jsFilePath, callback) {
    var script = document.createElement("script");

    script.type = "text/javascript";
    script.src = jsFilePath;

    script.onreadystatechange = callback;
    script.onload = callback;

    document.body.appendChild(script);
}

let files = [
    "../../API/src/HTMLManager.js",
    "../../API/src/HypervideoControlls.js",
    "../../API/src/Hypervideo.js"
];

let scriptsLoaded = 0;

function importHypervideoAPI(callback) {
    files.forEach(file => {
        includeJs(file, ()=> {
            scriptsLoaded++;
            if (scriptsLoaded === files.length) {
                callback();
            }
        });
    });
}

   