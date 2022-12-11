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

  
  
  api.registerCommand({
    name: 'show-config',
    description: 'show user config',
    fn: () => {
      console.log(1111, api.userConfig);
    }
  }
  );
};