const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

// webpackの設定ファイルの読み込み
const webpack_config = require("./webpack.config");

// タスクの定義
gulp.task("default", () => {
  return webpackStream(webpack_config, webpack).pipe(gulp.dest("www/js"));
});

gulp.task('browsersync', function() {
  browserSync.init({
    files: ['view/**/*.*', 'control/**/*.*'], // BrowserSyncにまかせるファイル群
    proxy: 'http://localhost:32002',  // express の動作するポートにプロキシ
    port: 4002,  // BrowserSync は 4001 番ポートで起動
    open: false,  // ブラウザ open しない
    reloadDelay: 2000
  });
});

gulp.task('serve', ['browsersync'], function () {
  nodemon({
    script: './www.js',
    ext: 'js html css',
    ignore: [  // nodemon で監視しないディレクトリ
      'node_modules',
    ],
    env: {
      'NODE_ENV': 'development'
    },
    stdout: false  // Express の再起動時のログを監視するため
  }).on('readable', function() {
  this.stdout.on('data', function(chunk) {
  if (/^Express\ server\ listening/.test(chunk)) {
        // Express の再起動が完了したら、reload() でBrowserSync に通知。
        // ※Express で出力する起動時のメッセージに合わせて比較文字列は修正
        reload();
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });
});
