module.exports = function (webpackConfig) {
  webpackConfig.babel.plugins.push(['antd', {
    style: 'css',
  }]);
  webpackConfig.babel.plugins.push([
    'react-intl', {
      messagesDir: './i18n-messages',
    },
  ]);
  webpackConfig.babel.cacheDirectory = false;

  return webpackConfig;
};
