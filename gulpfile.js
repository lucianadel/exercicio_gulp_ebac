import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import gulpImagemin from 'gulp-imagemin';
import gulpUglify from 'gulp-uglify';

const { src, dest, watch, series, parallel } = gulp;
const sassCompiler = gulpSass(sass);
const imagemin = gulpImagemin;
const uglify = gulpUglify;

// Função para compilar Sass
function compileSass() {
    return src('./src/sass/*.scss')
        .pipe(sassCompiler({ outputStyle: 'compressed' }))
        .pipe(dest('dist/css'));
}

// Função para comprimir imagens
function compressImages() {
    return src('./src/images/*')
        .pipe(imagemin())
        .pipe(dest('dist/images'));
}

// Função para comprimir javascript
function compressJS() {
    return src('./src/js/*.js')
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

gulp.task('compileSass', compileSass);
gulp.task('compressImages', compressImages);
gulp.task('compressJS', compressJS);

gulp.task('default', parallel('compileSass', 'compressImages', 'compressJS'));

