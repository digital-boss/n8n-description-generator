import path from 'path';

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
      "homepage": `https://github.com/${params.ns}/${packageName}`,
      "repository": {
        "type": "git",
        "url": `git+https://github.com/${params.ns}/${packageName}.git`
      },
    }
  }
}
