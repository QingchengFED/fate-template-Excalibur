/**
 * Created by lizifen on 16/11/14.
 * 可从控制台读取两个参数
 * env：项目运行环境('development':开发环境，'production':生产环境,default:'development')
 * dir：此次编译的项目名称(如:'weidong',default:全部项目)
 */
var minimist = require('minimist');

var knownOptions = {
    string: ['env', 'dirStr'],
    default: {env: process.env.NODE_ENV || 'development', dirStr: ''}
};

var options = minimist(process.argv.slice(2), knownOptions);

options.dirs = options.dirStr == '' ? null : options.dirStr.split(',');

module.exports = options;