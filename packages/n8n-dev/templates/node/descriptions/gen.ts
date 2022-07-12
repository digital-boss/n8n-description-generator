import path from 'path';
import fs from 'fs';
import { createMapFromTransformers, Transformers } from '@digital-boss/n8n-node-generator/dist/transform';
import { TypeName } from '@digital-boss/n8n-node-generator/dist/usecases/res-op/types';
import { matchType } from '@digital-boss/n8n-node-generator/dist/transform';
import * as trCmn from '@digital-boss/n8n-node-generator/dist/usecases/res-op/transformers/common';
import * as trParam from '@digital-boss/n8n-node-generator/dist/usecases/res-op/transformers/param';
import * as trOpt from '@digital-boss/n8n-node-generator/dist/usecases/res-op/transformers/option';
import { createTypeMarker } from '@digital-boss/n8n-node-generator/dist/mark';
import { TraverseContext } from '@digital-boss/n8n-node-generator/dist/TraverseContext';
import { getTypeResolvers } from '@digital-boss/n8n-node-generator/dist/usecases/res-op/typeResolvers';
import { traverseMap, traverseVisit } from '@digital-boss/n8n-node-generator/dist/traverse';
import { readYaml, write } from '@digital-boss/n8n-node-generator/dist/io';
import { getDescriptionsDict } from '@digital-boss/n8n-node-generator/dist/usecases/res-op/descrBuilder';
import { getJsModuleForNode } from '@digital-boss/n8n-node-generator/dist/codegen';
import { getTypesForResourceOperations, writeDescriptionModules } from '@digital-boss/n8n-node-generator/dist/usecases/res-op/helpers';
import { INodeDescr } from './types';

const transformers1: Transformers<TypeName, INodeDescr> = [
	[matchType<TypeName>('Param'), [
		[trCmn.isString, trParam.importFromModel],
		[trParam.isLink, trParam.linkFromModel],
		trParam.setType,
		trParam.setDefault,
		trCmn.setDisplayName,
		trParam.setRequired,
	]],
	[matchType<TypeName>('Option'), [
		[trCmn.isString, trOpt.fromString],
		trOpt.setName,
	]],
	[matchType<TypeName>('PropCollection'), trCmn.setDisplayName],
];

const transformers2: Transformers<TypeName, INodeDescr> = [
	[matchType<TypeName>('Param'), [
		trParam.setDisplayOptions,
	]],
];

const main = () => {
	const dirWork = './nodes/{{nodeName}}/descriptions';
	const dirOut = path.join(dirWork, 'generated');
	const st0Json = readYaml<INodeDescr>(dirWork, '{{nodeName}}.description');

	//*** Prepare

	const ctx = new TraverseContext<TypeName, INodeDescr>(st0Json);
	const typeMarker = createTypeMarker(ctx, getTypeResolvers());
	const map1 = createMapFromTransformers(ctx, transformers1);
	const map2 = createMapFromTransformers(ctx, transformers2);

	//*** Transform & Generate

	traverseVisit(typeMarker, ctx.sourceObj);
	const st1JsonNorm = ctx.sourceObj = traverseMap(map1, ctx.sourceObj);
	const st2JsonFinal = traverseMap(map2, ctx.sourceObj);
	const descriptionsDict = getDescriptionsDict(st2JsonFinal.resources);

	//*** Write

	fs.writeFileSync(`${dirOut}/nodeDescr.ts`, getJsModuleForNode(st1JsonNorm, 'INodeDescr', '../types'));
	fs.writeFileSync(`${dirOut}/resourceOperations.ts`, getTypesForResourceOperations(st1JsonNorm.resources));
	writeDescriptionModules(dirOut, descriptionsDict);

	//*** Write Debuging Data

	// write(dirOut, 'nodeDesc', st1JsonNorm);
	// write(dirOut, 'nodeDesc-state', ctx.data);
	// write(dirOut, 'nodeDesc-final', st2JsonFinal);
};

main();

