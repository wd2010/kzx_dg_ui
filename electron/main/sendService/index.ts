import fs from 'fs'
import path from 'path'
import { runCommand } from './commands'
import {v4 as uuidV4} from 'uuid'

export const sendService = async (filePath, fileName, author) => {
  const pkgPath = path.join(process.cwd(), './tmp/package.json')
  const tmpPath = path.join(process.cwd(), './tmp')

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
    await fs.writeFileSync(pkgPath, pkgData)
    await fs.copyFileSync(filePath, path.join(tmpPath, fileName))
  
    console.log('npm publish ...')
    await runCommand('cd tmp && npm publish')
    console.log('publish finished')
    await fs.rmSync(tmpPath, { recursive: true, force: true })
    console.log(`包: kzx_${repoName} 发布成功`)

    return pkgData
  } catch (e) {
    console.log('报错了:',e)
    await fs.rmSync(tmpPath, { recursive: true, force: true })
  }
}

