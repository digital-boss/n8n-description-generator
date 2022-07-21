import path from 'path';
import { IPackageParams } from "./newPackage";

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

const toLowerCamel = (s: string) => s[0].toLowerCase() + s.slice(1);

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
