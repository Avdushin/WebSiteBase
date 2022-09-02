const { src, dest, series, watch } = require('gulp'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    include = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    csso = require('gulp-csso'),
    sync = require('browser-sync').create()

function html() {
    return src('src/**/**.html')
        .pipe(include({
            prefix: "@@",
        }))
        .pipe(htmlmin({ collapseWhitespace: false }))
        .pipe(dest('dist'))
}
function assets() {
    return src('src/**/**')
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
function server() {
    sync.init({
        server: './dist'
    })

    watch('src/**/**.html', series(html)).on('change', sync.reload)
    watch('src/assets/**/**', series(assets)).on('change', sync.reload)
}

exports.build = series(assets, html)
exports.server = series(assets, html, server)
exports.default = series(assets, html, server)