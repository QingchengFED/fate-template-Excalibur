/**
 * Created by lizifen on 16/8/28.
 * 每一个项目都有自己的一份
 */
var dirVars = require('../config/dir.config')

module.exports = {
    project1: {
        build_path: `${dirVars.rootDir}/apps/project1/build-scripts/build.js`,
        pre_publish_path: `${dirVars.rootDir}/apps/project1/build-scripts/pre_build.js`,
        config:`${dirVars.rootDir}/apps/project1/config/index.js`
    },
    project2: {
        build_path: `${dirVars.rootDir}/apps/project2/build-scripts/build.js`,
        pre_publish_path: `${dirVars.rootDir}/apps/project2/build-scripts/pre_build.js`,
        config:`${dirVars.rootDir}/apps/project2/config/index.js`
    }
}