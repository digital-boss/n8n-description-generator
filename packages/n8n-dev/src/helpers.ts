import path from 'path';

const toLowerCamel = (s: string) => s[0].toLowerCase() + s.slice(1);

// newPackage

export interface IPackageParamsMin {
  ns: string,
  suffix: string,
  baseDir: string,
  desc?: string;
}

export interface IPackageParams extends IPackageParamsMin {
  packageName: string,
  packageFullName: string,
  packageDir: string,
  packageJson: any,
}

export const newPackage = (params: IPackageParamsMin): IPackageParams => {
  const packageName = `n8n-nodes-${params.suffix}`;
  const packageFullName = `@${params.ns}/${packageName}`;
  const packageDir = path.join(params.baseDir, packageName);
  return {
    ...params,
    packageName,
    packageFullName,
    packageDir,
    packageJson: {
      "name": packageFullName,
      "description": params.desc || '',
      "homepage": `https://github.com/${params.ns}/${params.packageName}`,
      "repository": {
        "type": "git",
        "url": `git+https://github.com/${params.ns}/${params.packageName}.git`
      },
    }
  }
}

// newNode

export interface INodeParamsMin {
  package: IPackageParams,
  nodeName: string,
  brandColor: string,
  iconPath?: string,
}

export interface INodeParams extends INodeParamsMin {
  nodeNameCamel: string,
  iconFileName: string,
  nodeDir: string,
  packageJson: any,
}

export const newNode = (params: INodeParamsMin): INodeParams => {
  const name = params.nodeName.toLowerCase();
  
  const nodeNameCamel = toLowerCamel(params.nodeName);
  return {
    ...params,
    nodeNameCamel,
    iconFileName: nodeNameCamel + path.extname(params.iconPath || ''),
    nodeDir: path.join(params.package.packageDir, 'nodes', params.nodeName),
    packageJson: {
      "n8n": {
        "credentials": [
          `dist/credentials/${params.nodeName}Api.credentials.js`
        ],
        "nodes": [
          `dist/nodes/${params.nodeName}/${params.nodeName}.node.js`
        ]
      },
    },
  }
}
