const format = require('date-fns/format');
const commitHash = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString();
const buildTime = format(new Date(), 'dd.MM.yyyy HH:mm');

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  chainWebpack: config => {
    config.plugin('define')
      .tap(args => {
        const arg0 = args[0];
        return [{
          ...arg0,
          GIT_COMMIT: JSON.stringify(commitHash),
          BUILD_TIME: JSON.stringify(buildTime)
        }]
      });
    config.plugin('fork-ts-checker')
      .tap(args => {
        const arg0 = args[0];
        return [{
          ...arg0,
          reportFiles: ['!**/__tests__/*.ts']
        }]
      });
  }
}
