# n8n Code Generator

Typically when you are going to create a new node (and package), you clone a [starter](https://github.com/digital-boss/n8n-nodes-starter) repository and do bunch of renamings, delete some content and add other.

This code generation library intended to simplify this process. 

Take a look at regular node generation script [src/scripts/regural.ts](src/scripts/regural.ts). 

In script you specify:
- for package
  - base dir - where to create package folder?
  - namespace, i.e. `digital-boss`
  - siffix. Because package name is in format `n8n-nodes-$suffix`
- for node
  - name
  - brand color
  - icon path
- a list of tasks to perform:
  - remove package dir, if it's already exists
  - create package
  - create node
  - init git repo

You can create code generation script based on existing examples (`src/scripts`), edit parameters and run it to generate new Node and package. 

## Usage

1. Clone repository & install dependencies
```bash
git clone git@github.com:digital-boss/n8n-node-generator.git
cd n8n-node-generator/packages/n8n-code-generator
npm install
```

2. Open project folder in your favorite editor (i.e. `code .`)

3. Create generation script. 
    - You can start with bolerplate from `src/scripts`. Choose script and copy it to `src/scripts/local`. Rename it. Edit it. `src/scripts/local`  
    - Ensure that `baseDir` in your script is outside current git repository. It's better to set absolute path for `baseDir`.

4. Run your script `npm run exec -- src/scripts/local/$script.ts`.

5. Decide - whether you will use a [descriptions generator](https://github.com/digital-boss/n8n-node-generator/tree/main/packages/n8n-description-generator) or you will create [json description](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/). 
    - The more of the following conditions match, the more convenient it will be to use **description generator**:
      - You have large amount of properties in Node
      - You have resource -> operation structure in Node
      - Each operation has its own endpoint address (possible with parameters, like: `api/v2/accounts/{id}/listPayments`)
    - If you decided not to use description generator, then 
        - remove content of `descriptions` subfolder of your generated node folder.

6. Check generated result:
    - cd into new package dir
    - npm i
    - npm run gen # only if you use descriptions generator
    - npm run build
    - npm link
    - at n8n local instance
      - `npm link -S @digital-boss/n8n-nodes-$name` - add link to new package
      - `npx n8n` - start local instance


## Architecture

The core library classes is very simple, checkout [`src/lib.ts`](src/lib.ts).

### Templates types and structure

```
templates
  credentials
    three-fields
  package
    starter
  regular-node
    regular
  trigger-node
    trigger
  common
    simplify
    design patterns
    ...
  tests (tests for the lib)
```

## Current State

This isn't finished product. But we already can use it and improve it. And if you are part of the team, then you can help with contributions. 

Areas of improvement:

- Add more templates and tasks:
  - Generation of trigger node
  - Adding various usage of https://github.com/digital-boss/n8n-designpatterns

- Add other interfaces ontop of library:
  - CLI
  - yaml. For yaml it will be looks similar to popular devops tool [Ansible](https://github.com/ansible/ansible)
