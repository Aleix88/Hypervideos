const { src, dest, series } = require('gulp');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');


function babelTask(cb) {
    return src('./src/*.js')
    //Converteix el ECMA6 en ECMA5 per poder fer minify
    .pipe(babel({
        presets: ['@babel/env'],
        plugins: ["@babel/plugin-proposal-class-properties"]
    }))
    .pipe(dest("./babel"));
}

function minifyTask(cb) {
    return src('./babel/*.js')
    //Unifiquem tots els fitxers en un que es dira all.js
    .pipe(concat("all.js"))
    .pipe(dest('./distri'))    
    //Minimitzem el fitxer all.js
    .pipe(minify({
        ext: {
            min: '.min.js'
        }
    }))
    .pipe(dest('./distri'));  
}

exports.babel = babelTask;
exports.minify = minifyTask;

exports.build = series(babelTask, minifyTask);