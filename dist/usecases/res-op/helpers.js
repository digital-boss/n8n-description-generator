import{a as i,b as p,d as s}from"../../chunk-7YHHYADC.js";import d from"fs";var j=(o,t)=>{Object.keys(t).map(e=>{let r=t[e];d.writeFileSync(`${o}/${e}.ts`,p(r,e),"utf-8")})},l=o=>{let t=s("resourcesConst",Object.keys(o)),e=Object.entries(o).map(([r,c])=>{let m=Object.entries(c.operations).filter(([n,a])=>!a.notImplemented).map(([n])=>n);return s(`${r}Ops`,m)}).join(`

`);return[i,t,e].join(`

`)+`
`};export{l as getTypesForResourceOperations,j as writeDescriptionModules};
//# sourceMappingURL=helpers.js.map
