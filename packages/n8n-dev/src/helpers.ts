import path from 'path';

interface INewNodeParamsMin {
  ns: string,
  nodeName: string,
  outDir: string,
  desc?: string;
  iconPath?: string;
}

interface INewNodeParams extends INewNodeParamsMin {
  packageName: string,
  packageFullName: string,
  packageDir: string,
  nodeNameCamel: string,
  iconFileName: string,
  nodeDir: string,
}

export const newNode = (params: INewNodeParamsMin): INewNodeParams => {
  const name = params.nodeName.toLowerCase();
  const packageName = `n8n-nodes-${name}`;
  const packageDir = path.join(params.outDir, packageName);
  const nodeNameCamel = params.nodeName[0].toLowerCase() + params.nodeName.slice(1);
  return {
    ...params,
    packageName,
    packageFullName: `@${params.ns}/${packageName}`,
    packageDir,
    nodeDir: path.join(packageDir, 'nodes', params.nodeName),
    nodeNameCamel,
    iconFileName: nodeNameCamel + path.extname(params.iconPath || ''),
  }
}

export const getPackageJson = (params: INewNodeParams): any => {
  return {
    "name": params.packageFullName,
    "description": params.desc || '',
    "homepage": `https://github.com/${params.ns}/${params.packageName}`,
    "repository": {
      "type": "git",
      "url": `git+https://github.com/${params.ns}/${params.packageName}.git`
    },
    "n8n": {
      "credentials": [
        `dist/credentials/${params.nodeName}Api.credentials.js`
      ],
      "nodes": [
        `dist/nodes/${params.nodeName}/${params.nodeName}.node.js`
      ]
    },
  }
}