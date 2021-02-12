const { src, dest, series } = require('gulp');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const del = require('del');
const order = require("gulp-order");

const filesOrder = [
    "Model/Plugin.js",
    "Model/VideoTimer.js",
    "Model/Observer/**/*.js",
    "Controller/Manager/**/*.js",
    "Utils/*.js",
    "View/**/*.js",
    "Controller/*.js"
];

function babelTask(cb) {
    return src('./dev/hypervideo.js')
    //Converteix el ECMA6 en ECMA5 per poder fer minify
    .pipe(babel({
        presets: ['@babel/env'],
        plugins: ["@babel/plugin-proposal-class-properties"]
    }))
    .pipe(dest("./babel"));
}

    //["@babel/plugin-transform-classes"]


function minifyTask(cb) {
    return src('./babel/*.js')
    //Unifiquem tots els fitxers en un que es dira all.js
    .pipe(dest('./distri'))    
    //Minimitzem el fitxer all.js
    .pipe(minify({
        ext: {
            min: '.min.js'
        }
    }))
    .pipe(dest('./distri'));  
}

function clean(cb) {
    return del('./distri/**', {force:true});
}

function concatTask(cb) {
    return src('./src/**/*.js')
    .pipe(order(filesOrder))
    //Unifiquem tots els fitxers en un que es dira all.js
    .pipe(concat("hypervideo.js"))
    .pipe(dest('./dev'));
}

exports.babel = babelTask;
exports.minify = minifyTask;
exports.clean = clean;

exports.build = series(clean, concatTask, babelTask, minifyTask);
exports.devBuild = series(clean, concatTask); 