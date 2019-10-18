const {
  task,
  src,
  watch,
  series,
  parallel,
  dest
} = require("gulp");
const imagemin = require("gulp-imagemin");
const autoPrefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// browserSync
function browser_sync() {
  browserSync.init({
    server: {
      open: false,
      baseDir: "./dist"
    }
  });
}

// reload
function reload(done) {
  browserSync.reload();
  done();
}

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
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(autoPrefixer())
    .pipe(dest("dist"));
  done();
}


// watch files for changes
function watch_files() {
  watch("src/images/*", series(image, reload));
  watch("src/sass/*.sass", series(css, reload));
  watch("src/js/*.js", series(js, reload));
  watch("src/*.html", series(html, reload));
}

// tasks
task("css", css);
task("js", js);
task("image", image);
task("html", html);
task("default", parallel(css, js, image, html));
task("watch", parallel(browser_sync, watch_files));
