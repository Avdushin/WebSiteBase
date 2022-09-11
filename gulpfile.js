const { src, dest, series, watch } = require('gulp'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    include = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    csso = require('gulp-csso'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    path = require("path"),
    rootFolder = path.dirname(__filename).split(path.sep).pop(),
    sync = require('browser-sync').create()

function html() {
    return src(['!src/**/_*/', 'src/**/**.html'])
        .pipe(include({
            prefix: "@@",
        }))
        .pipe(htmlmin({ collapseWhitespace: false }))
        .pipe(dest('dist'))
}
function assets() {
    return src(['!src/_*/', 'src/**/**'])
        .pipe(include({
            prefix: "@@",
        }))
        .pipe(removeEmptyLines({
            removeComments: false
        }))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(csso()) // to minimize css (without comments)
        .pipe(dest('dist/'))
}
function css() {
    return src(['src/assets/css/**/**.css', 'src/**/**.html'])
        .pipe(include({
            prefix: "@@",
        }))
        .pipe(removeEmptyLines({
            removeComments: false
        }))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(csso())
        .pipe(dest('dist/css/'))
}
function prname() {
    return src('dist/index.html')
        .pipe(replace('%prname%', rootFolder))
        .pipe(dest('dist/'));
}
function clearcss() {
    return src('dist/**/**')
        .pipe(replace('<link rel="stylesheet" href="@@styles"> <!-- Advanced styles -->>', ''))
        .pipe(dest('dist/'));
}
function server() {
    sync.init({
        server: './dist',
        notify: false
    })

    watch('src/**/**.html', series(html, prname)).on('change', sync.reload) // html watcher
    watch('src/404.html', series(html, prname)).on('change', sync.reload) // 404 page wathcer
    watch('src/assets/**/**', series(assets, prname)).on('change', sync.reload) // styles wathcer
}

exports.build = series(assets, html, clearcss, prname)
exports.server = series(assets, html, clearcss, prname, server)
exports.default = series(assets, html, clearcss, prname, server)