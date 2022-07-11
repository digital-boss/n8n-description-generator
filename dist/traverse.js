var s=(n,e,o,a,i)=>{let p=n(o,a,i),t=e==="visit"?o:p;if(t instanceof Array)return t.map((T,r)=>s(n,e,T,[...a,r],i));if(t!==null&&typeof t=="object"){let T=Object.entries(t).map(([r,u])=>[r,s(n,e,u,[...a,r],i)]);return Object.fromEntries(T)}return t},c=(n,e)=>{s(n,"visit",e,[],e)},v=(n,e)=>s(n,"map",e,[],e);export{v as traverseMap,c as traverseVisit};
//# sourceMappingURL=traverse.js.map
