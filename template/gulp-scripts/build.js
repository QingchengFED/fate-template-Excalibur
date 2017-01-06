/**
 * Created by lizifen on 16/8/29.
 * 项目静态文件编译入口，读取的是每个app的编译build文件
 */
var gulp = require('gulp');
var config = require('../config/build.config');
var options = require('./options');
var _ = require('lodash');

var allProjects = function getProjects() {
    var _projects = [];
    _.forEach(config, function (value, key) {
        _projects.push(key);
    })

    return _projects;
}();

//build是可执行脚本
var build = function () {
    var projects = options.dirs ? options.dirs : allProjects;

    _.forEach(projects, function (project) {
        var build_path = options.env === 'preBuild' ? config[project].pre_build_path : config[project].build_path;

        var build = require(build_path);

        return build;
    })

}

module.exports = build;