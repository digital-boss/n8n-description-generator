var p=(n,a,e,r)=>{if(n(e,r)){let T=e;if(typeof a=="function")T=a(T,r);else if(a instanceof Array)a.forEach(t=>{if(typeof t=="function")T=t(T,r);else if(t instanceof Array){let[o,y]=t;T=p(o,y,T,r)}});else throw new Error("Unexpected value type.");return T}return e},s=(n,a)=>(e,r,T)=>{n.path=[...r];let t=e;for(let[o,y]of a)t=p(o,y,t,n);return t},c=(n,a)=>(e,r)=>{if(!(n in e)){let T=a(e,r);if(T!==void 0)return{...e,[n]:T}}return e},m=n=>(a,e)=>{let r=e.getData();return r!==void 0&&r.type===n};export{s as a,c as b,m as c};
//# sourceMappingURL=chunk-YPTOEP6D.js.map
