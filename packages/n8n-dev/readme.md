## Usage

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

## ToDo

- May be ITask is just (functional) Pipe?
