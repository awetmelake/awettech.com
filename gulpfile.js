const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");

// copy html
function html(done) {
 gulp.src("src/*.html").pipe(gulp.dest("dist"));
 done();
}

// optimize images
function image(done) {
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
  done();
}

// minify js
function js(done) {
  gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
    done();
}

// compile sass
function css(done) {
  gulp
    .src("src/sass/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist"));
    done();
}

// watch files for changes
function watch_files(){
    gulp.watch("src/images/*", image);
    gulp.watch("src/sass/*.sass", css);
    gulp.watch("src/js/*.js", js);
    gulp.watch("src/*.html", html);
}

// tasks
gulp.task("css", css);
gulp.task("js", js);
gulp.task("image", image);
gulp.task("html", html);
gulp.task("default", gulp.parallel(css, js, image, html));
gulp.task("watch", gulp.series(watch_files));
