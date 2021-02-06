"use strict";

function includeJs(jsFilePath, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = jsFilePath;
  script.onreadystatechange = callback;
  script.onload = callback;
  document.body.appendChild(script);
}

var files = ["../../API/src/HTMLManager.js", "../../API/src/HypervideoControlls.js", "../../API/src/Hypervideo.js"];
var scriptsLoaded = 0;

function importHypervideoAPI(callback) {
  files.forEach(function (file) {
    includeJs(file, function () {
      scriptsLoaded++;

      if (scriptsLoaded === files.length) {
        callback();
      }
    });
  });
}