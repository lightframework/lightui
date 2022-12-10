import type { IApi } from 'umi';
 
export default (api: IApi) => {
  api.describe({
    key: 'showWebpack',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
    enableBy: api.EnableBy.config
  });

  const webpackConfig = api.config.webpack;
  api.chainWebpack((config) => {
    if (api.config.showWebpack) {
      config.plugin('show-webpack').use(require.resolve('./show-webpack'));
    }
    return config;
  })
  api.registerCommand({
    name: 'show-webpack',
    description: 'show webpack config',
    fn: () => {
      console.log(1111, webpackConfig);
    }
  }
  );
};