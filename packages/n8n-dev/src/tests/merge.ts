import mergeWith from 'lodash.mergewith';

const json = {
  "n8n": {
    "credentials": [
      "dist/credentials/MyNode1Api.credentials.js"
    ],
    "nodes": [
      "dist/nodes/MyNode2/MyNode1.node.js"
    ]
  },
}

const obj = {
  "n8n": {
    "credentials": [
      "dist/credentials/MyNode2Api.credentials.js"
    ],
    "nodes": [
      "dist/nodes/MyNode2/MyNode2.node.js"
    ]
  },
}

const res = mergeWith(json, obj, (value, srcValue) => {
  if (value instanceof Array && srcValue instanceof Array) {
    return value.concat(srcValue);
  }
  return undefined;
});

console.log(res);