import fs from 'fs'
import path from 'path'
import { runCommand } from './commands'
import {v4 as uuidV4} from 'uuid'
import os from 'os'
import log from 'electron-log';
import {app} from 'electron'

// 临时tmp文件夹
const osTmpPath = os.tmpdir()
const appPath = app.getAppPath()

const npmPath = path.join(appPath, '../npm/bin/npm')

log.error('__dirname---',__dirname)
log.error('appPath---',appPath)
export const sendService = async (filePath, fileName, author) => {
  const pkgPath = path.join(osTmpPath, './my_tmp/package.json')
  const tmpPath = path.join(osTmpPath, './my_tmp')
  const npmrcPath = path.join(osTmpPath, './my_tmp/.npmrc')

  try {

    await fs.rmSync(tmpPath, { recursive: true, force: true })
    await fs.mkdirSync(tmpPath)
  
    console.log(filePath, fileName)
    
    const repoName = uuidV4().slice(0, 8)
  
    const pkgData = `
      {
        "name": "kzx_${repoName}",
        "version": "1.0.0",
        "main": "index.js",
        "author": "${author}",
        "keywords": ["${fileName}"],
        "description": "${fileName}"
      }
    `
    const npmrcData = `registry=https://registry.npmjs.org/
home=https://www.npmjs.org
//registry.npmjs.org/:_authToken=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
    `
    await fs.writeFileSync(pkgPath, pkgData)
    await fs.copyFileSync(filePath, path.join(tmpPath, fileName))
  
    console.log('npm publish ...')
    await fs.writeFileSync(npmrcPath, npmrcData)
    await runCommand(`cd ${tmpPath} && ${npmPath} publish`)
    console.log('publish finished')
    // await fs.rmSync(tmpPath, { recursive: true, force: true })
    console.log(`包: kzx_${repoName} 发布成功`)

    return pkgData
  } catch (e) {
    console.log('报错了:',e)
    await fs.rmSync(tmpPath, { recursive: true, force: true })
    return e
  }
}

