const { src, dest, series, watch } = require('gulp'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    include = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    replace = require('gulp-replace'),
    // del = require('del'),
    fs = require('fs'),
    path = require("path"),
    rootFolder = path.dirname(__filename).split(path.sep).pop(),
    sync = require('browser-sync').create()

const clean = require('gulp-clean');

function html() {
    return src(['!src/_parts/', 'src/**/**.html'])
        .pipe(include({
            prefix: "@@",
        }))
        .pipe(htmlmin({ collapseWhitespace: false }))
        .pipe(dest('dist'))
}
// Images
function imgs() {
    return src(['src/assets/**/**'])
    .pipe(dest('dist/assets/'))
}
function scss() {
    return src('src/scss/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        // .pipe(csso)
        .pipe(concat('index.css'))
        .pipe(removeEmptyLines({
            removeComments: false
        }))
        .pipe(dest('dist/assets/css/'))
}
function prname() {
    return src('dist/index.html')
        .pipe(replace('%prname%', rootFolder))
        .pipe(dest('dist/'));
}
function clearcss() {
    return src('dist/**/**')
        .pipe(replace(`<link rel="stylesheet" href="@@styles"> <!-- Advanced styles -->`, ''))
        .pipe(dest('dist/'));
}
function server() {
    sync.init({
        server: './dist',
        notify: false
    })

    watch('src/**/**.html', series(html, prname)).on('change', sync.reload) // html watcher
    watch('src/404.html', series(html, prname)).on('change', sync.reload) // 404 page wathcer
    watch('src/assets/**/**', series(scss, prname)).on('change', sync.reload) // styles wathcer
    watch('src/scss/**/**.scss', series(scss, prname)).on('change', sync.reload) // styles wathcer
}

function clearParts() {
    return src(['./dist/**/_parts/'], {read: false})
        .pipe(clean());
}
function clsbuild() {
return src(['./dist/**/_parts/'], {read: false})
        .pipe(clean());
}

exports.build = series(clsbuild, imgs, scss, html, clearParts, clearcss, prname)
exports.server = series(imgs, scss, html, clearParts, clearcss, prname, server)
exports.default = series(imgs, scss, html, clearParts, clearcss, prname, server)