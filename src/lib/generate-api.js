const fs = require('fs');

function generateApi(jsonPath) {
  const json = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(json);

  const ret = [];

  Object.entries(data.paths).forEach(([path, apis]) => {
    Object.entries(apis).forEach(([method, api]) => {
      ret.push({ path, method, name: api.summary, func: api.operationId });
    });
  });

  return ret;
}

function generateAccessType(jsonPath) {
  const json = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(json);

  const funcNames = Object.values(data)
    .flat()
    .map((api) => `'${api.func}'`)
    .join('|');

  fs.writeFileSync(
    './src/constants/api-func-name.ts',
    `export type ApiFuncName = ${funcNames}`,
  );
}

const apis = {
  sys: generateApi('./swagger/sys.json'),
  cmdb: generateApi('./swagger/cmdb.json'),
  ops: generateApi('./swagger/ops.json'),
};

fs.writeFileSync('./src/constants/apis.json', JSON.stringify(apis, null, 2));

generateAccessType('./src/constants/apis.json');
