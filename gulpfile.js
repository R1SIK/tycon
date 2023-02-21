const { src, dest, watch, series } = require("gulp");
const pug = require("gulp-pug");
const rollup = require("@rollup/stream");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const connect = require("gulp-connect");

// *Optional* Depends on what JS features you want vs what browsers you need to support
// *Not needed* for basic ES6 module import syntax support
const babel = require("@rollup/plugin-babel");

// Add support for require() syntax
const commonjs = require("@rollup/plugin-commonjs");

// Add support for importing from node_modules folder like import x from 'module-name'
const nodeResolve = require("@rollup/plugin-node-resolve");

let cache;

exports.js = () => {
  return (
    rollup({
      // Point to the entry file
      input: "./src/assets/js/index.js",

      // Apply plugins
      plugins: [babel(), commonjs(), nodeResolve()],

      // Use cache for better performance
      cache: cache,

      // Note: these options are placed at the root level in older versions of Rollup
      output: {
        // Output bundle is intended for use in browsers
        // (iife = "Immediately Invoked Function Expression")
        format: "iife",

        // Show source code when debugging in browser
        sourcemap: true,
      },
    })
      .on("bundle", (bundle) => {
        // Update cache data after every bundle is created
        cache = bundle;
      })
      // Name of the output file.
      .pipe(source("index.js"))
      .pipe(buffer())
      .pipe(dest("./dist/js"))
  );
};

exports.css = () => {
  return src("./src/assets/css/**").pipe(dest("./dist/css"));
};

exports.images = () => {
  return src("./src/assets/images/**").pipe(dest("./dist/images"));
};

exports.views = () => {
  return src("./src/**/*.pug")
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(dest("./dist"));
};

exports.webserver = () => {
  return connect.server();
};

exports.default = series(
  exports.views,
  exports.js,
  exports.css,
  exports.images,
  // exports.webserver,
  (cb) => {
    watch("src/**/*", exports.views);
    watch("src/assets/js/index.js", exports.js);
    watch("src/assets/images/**/*", exports.images);
    watch("src/assets/css/**/*", exports.css);
    cb();
  }
);

exports.build = series(exports.views, exports.js, exports.css, exports.images);
