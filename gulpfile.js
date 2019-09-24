const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");

gulp.task("defualt", function() {});
gulp.task("copyHtml", function() {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task("imageMin", function() {
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

// minify js
gulp.task("minify", function() {
  gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

// compile sass
gulp.task("sass", function() {
  gulp
    .src("src/sass/*.sass")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("dist"));
});
