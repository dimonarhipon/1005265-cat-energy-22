const del = require("del");
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const svgstrore = require("gulp-svgstore");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};
exports.styles = styles;

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

// JS

// const scripts = () => {
//   return gulp.src("source/js/script.js")
//     .pipe(terser())
//     .pipe(gulp.dest("build/js"))
//     .pipe(sync.stream());
// }
// exports.scripts = scripts;

// Clean

const clean = () => {
  return del("build");
};

// Images

const optimizeImages = () => {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}
exports.images = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}
exports.images = copyImages;

const createWebp = () => {
  return gulp.src("source/img/*.{png,jpg}")
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest("build/img"))
}
exports.createWebp = createWebp;

// sprite

const sprite = () => {
  return gulp.src("source/img/*.svg")
    .pipe(svgstrore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/assets/*ico",
    "source/assets/*.json",
    "source/img/**/*.{jpg,png,svg}",
    "source/js/script.js"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.server = server;

const reload = (done) => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  // gulp.watch("source/js/*.js", gulp.series("scripts"));
  gulp.watch("source/*.html", gulp.series(html, reload));
};
exports.default = gulp.series(styles, server, watcher);

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    // scripts,
    sprite,
    createWebp
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
    build,
    server,
    watcher
  );
