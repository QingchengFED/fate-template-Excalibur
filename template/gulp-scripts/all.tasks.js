/**
 * Created by lizifen on 17/1/5.
 */
var gulp = require('gulp');
var buildConfig = require('../config/build.config');
var deployConfig = require('../config/deploy.config');
var dirVars = require('../config/dir.config');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var _ = require('lodash');
var fs = require('fs');
var build = require('./build');
var options = require('./options');

var VERSION;
var tasks = {};

//读取appa目录下的所有文件，得到所有的app
var projects = options.dirs;

tasks.collectDists = function () {
    var srcTemplate = _.template(dirVars.distDirTemplate);
    var destTemplate = _.template(dirVars.destDirTemplate);
    var stream = null;

    _.forEach(projects, function (project) {
        var src = srcTemplate({project: project}),
          dest = destTemplate({project: project});

        stream = gulp.src(src)
          .pipe($.rename((path) => {
              path.dirname = path.dirname.replace(/dist\//, '');
          }))
          .pipe(gulp.dest(dest));

    })

    return stream;

};

tasks.buildVersion = function () {
    var src = dirVars.versionDir;

    if (!fs.existsSync(src)) {
        fs.writeFileSync(src, JSON.stringify({}));
    }
    return gulp.src(src)
      .pipe($.jsonEditor(function (json) {
          json = json || {};

          var compiled = _.template(deployConfig.cdnLink);
          VERSION = Date.now();

          _.forEach(projects, function (item) {
              json[item] = json[item] || {};
              json[item].version = VERSION;
              json[item].dev = {
                  "_env": "development",
                  "_root": `/static/${item}/`
              }
              json[item].pro = {
                  "_env": "production",
                  "_root": compiled({version: VERSION, project: item})
              }
          })

          return json;
      }))
      .pipe(gulp.dest(dirVars.versionRootDir));
};

tasks.replaceCdnLink = function () {
    var compiled = _.template(deployConfig.cdnLink);
    var stream = null;

    _.forEach(projects, function (item) {

        var projectConfig = require(buildConfig[item].config);

        var src = [`${dirVars.destDir}/${item}/**`, `!${dirVars.destDir}/${item}/img/**`];
        var dest = `${dirVars.destDir}/${item}/`;

        stream = gulp.src(src)
          .pipe($.replace(projectConfig.prePublish.assetsPublicPath, compiled({version: VERSION, project: item})))
          .pipe(gulp.dest(dest));
    })

    return stream;
};

//上传CDN，./dist下的所有文件
tasks.uploadCdn = function (src) {
    var compiled = _.template(deployConfig.cdnFolder);
    var stream = null;

    _.forEach(projects, function (item) {
        src = `${dirVars.destDir}/${item}/**/*`;

        stream = gulp.src(src)
          .pipe($.upyun.upyunDest(compiled({version: VERSION, project: item}), deployConfig.cdnAccount))
    })

    return stream;
};

module.exports = tasks;