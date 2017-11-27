const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpackの設定ファイルの読み込み
const webpack_config = require("./webpack.config");

// タスクの定義
gulp.task("default", () => {
  return webpackStream(webpack_config, webpack).pipe(gulp.dest("dist"));
});
