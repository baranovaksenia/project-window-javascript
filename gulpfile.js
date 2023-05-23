"use strict";

// import packages 
const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

// create var dist - path where all files should be after compilation (dist folder)
const dist = "./dist/";

// watch on changes in html files
// put in dist folder and reload the page
gulp.task("copy-html", () => {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

// webpack has 2 modes: development and production
// in production mode we don't use unnecessary packages
gulp.task("build-js", () => {
  // start in main.js and run webpack
  return gulp.src("./src/js/main.js")
    .pipe(webpack({
      mode: 'development',
      output: {
        // where will be all the code
        filename: 'script.js',
        // path: dist
      },
      watch: false,
      // create source map
      devtool: "source-map",
      module: {
        rules: [
          {
            // run babel
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  // show in console errors
                  debug: true,
                  // setup polifils - code in old browsers
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    // created file send to dist folder
    .pipe(gulp.dest(dist))
    .on("end", browsersync.reload);
});

// take all files from assets folder
// put in dist/assets, reload the browser
gulp.task("copy-assets", () => {
  return gulp.src("./src/assets/**/*.*")
    .pipe(gulp.dest(dist + "/assets"))
    .on("end", browsersync.reload);
});

// run server on port 4000
gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true
  });

  // gulp watches if something will change,
  // if something change run task copy-html etc
  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

// run all 3 tasks in parallel
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));


gulp.task("build-prod-js", () => {
  return gulp.src("./src/js/main.js")
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist));
});

// terminal gulp -> run 2 tasks watch and build
gulp.task("default", gulp.parallel("watch", "build"));