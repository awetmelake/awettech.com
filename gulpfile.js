const { task, src, watch, series, parallel, dest } = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");

// copy html
function html(done) {
  src("src/*.html").pipe(dest("dist"));
  done();
}

// optimize images
function image(done) {
  src("src/images/*")
    .pipe(imagemin())
    .pipe(dest("dist/images"));
  done();
}

// minify js
function js(done) {
  src("src/js/*.js")
    .pipe(uglify())
    .pipe(dest("dist"));
  done();
}

// compile sass
function css(done) {
  src("src/sass/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("dist"));
  done();
}

// watch files for changes
function watch_files() {
  watch("src/images/*", image);
  watch("src/sass/*.sass", css);
  watch("src/js/*.js", js);
  watch("src/*.html", html);
}

// tasks
task("css", css);
task("js", js);
task("image", image);
task("html", html);
task("default", parallel(css, js, image, html));
task("watch", series(watch_files));
