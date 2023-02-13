const { src, dest, watch, series } = require("gulp");
const pug = require("gulp-pug");

exports.views = () => {
  return src("./src/**/*.pug")
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(src("./src/assets/**"))
    .pipe(dest("./dist"));
};

exports.default = series(exports.views, (cb) => {
  watch("src/**/*", exports.views);
  cb();
});
