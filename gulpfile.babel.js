import gulp from "gulp";
import sass from "gulp-sass";
import browserify from "gulp-browserify";
import babel from "babelify";
import del from "del";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "./assets/scss/*.scss",
    dest: "./src/statics/styles",
    watch: "./assets/scss/*.scss"
  },
  js: {
    src: "./assets/js/main.js",
    dest: "./src/statics/js",
    watch: "./assets/js/*.js"
  }
};

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      browserify({
        transform: [babel.configure({ presets: ["@babel/preset-env"] })]
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const clean = () => del(["/src/statics"]);

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const dev = gulp.series(clean, styles, js, watchFiles);

export const build = gulp.series(clean, styles, js);

export default dev;
