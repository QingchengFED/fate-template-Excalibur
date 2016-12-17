/**
 * Created by lizifen on 16/8/28.
 * 每一个项目都有自己的一份
 */
var dirVars = require('../config/dir.config')

module.exports = {
    fibo: {
        build_path: `${dirVars.rootDir}/apps/fibo/build-scripts/build.js`,
        pre_build_path: `${dirVars.rootDir}/apps/fibo/build-scripts/pre_build.js`,
        config:`${dirVars.rootDir}/apps/web_admin/config/index.js`
    }
}