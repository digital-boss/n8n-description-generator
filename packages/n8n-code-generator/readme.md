## Usage

```bash
mkdir codegen-scripts && cd $_
npm init -y
# get latest tag
tag=`git ls-remote --tags --sort=v:refname git@github.com:n8n-io/n8n.git *n8n-code-generator* | cut -f2 | head -n 1 | cut -d"/" -f3-`
npm install --save github:digital-boss/n8n-node-generator#dist/$tag
```

Create your own generation sctipt based on `src/scripts/regular.ts`.

Put it in `src/scripts/local`.

Then run it

    npm run exec -- src/scripts/local/$script.ts

After you generate new Node Package:
- npm i
- npm run gen
- npm run build
- npm link
- at n8n local instance
  - `npm link -S @digital-boss/n8n-nodes-$name` - add link to new package
  - `npx n8n` - start local instance


## Making changes and the second option of using the library


## ToDo

- May be ITask is just (functional) Pipe?

## npm scripts

exec: `npm exec src/scripts/test/twoNodes.ts`