var n=t=>JSON.stringify(t,void 0,"	"),s="// This code was generated. Therefore do not edit it directly.",i=(t,r)=>{let o=n(t),e=t instanceof Array?"INodeProperties[]":"INodeProperties";return`${s}

import { INodeProperties } from "n8n-workflow";

export const ${r}: ${e} = ${o}
`},c=(t,r,o)=>{let e=n(t);return`${s}

import { ${r} } from '${o}';

export const nodeDescr: ${r} = ${e}
`},d=(t,r)=>{let o=n(r);return`export const ${t} = ${o} as const;`};export{s as a,i as b,c,d};
//# sourceMappingURL=chunk-7YHHYADC.js.map
