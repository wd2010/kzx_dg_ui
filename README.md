# kzx-dg-ui

将外网文件上传至npm，在公司内网可以直接获取

## Quick Start

```sh
pnpm i
pnpm dev
```

将`/Users/viki/Documents/demo/electron-vite-vue/electron/main/sendService/index.ts` npm authToken替换为自己的token

```sh
    const npmrcData = `registry=https://registry.npmjs.org/
home=https://www.npmjs.org
//registry.npmjs.org/:_authToken=you_npm_authtoken
    `
```
