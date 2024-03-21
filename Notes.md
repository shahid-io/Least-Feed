# TYPESCRIPT

- Install typescript

```bash
npm install -g typescript
```

- Initialize `tsc`

```bash
tsc --init
```

```bash
- terminal response
Created a new tsconfig.json with:
                                    TS
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig
```

- Configure in `tsconfig.json` file

```bash
    "module": "commonjs",          /* Specify what module code is generated. */
    "rootDir": "./src",            /* Specify the root folder within your source files. */
    "outDir": "./dist",            /* Specify an output folder for all emitted files. */
    "target": "es2016",            /* Set the JS language -v for emitted JS and include compatible library declarations. */
```

- configure `package.json` file

```bash
    - `script`
    "start:dev": "nodemon --exec ts-node src/index.ts",
    "start:prod": "tsc -p . && NODE_ENV=prod node dist/index.js",
    "start:build": "tsc -p ."
```

- Dependencies

```bash
    npm i cors dotenv express ip mysql2
    npm i @types/cors @types/express @types/ip types/mysql2 ts-node typescript

```
