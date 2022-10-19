import fs from 'fs'
import path from 'path'
import {v4 as uuidV4} from 'uuid'
import os from 'os'
import {publishPkg} from './publishPkg'
import {app} from 'electron';

// 临时tmp文件夹
const osTmpPath = os.tmpdir()
const appPath = app.getAppPath()

const npmPath = path.join(appPath, '../npm/bin/npm')

export const sendService = async (filePath, fileName, author) => {
  const pkgPath = path.join(osTmpPath, './my_tmp/package.json')
  const tmpPath = path.join(osTmpPath, './my_tmp')

  try {

    await fs.rmSync(tmpPath, { recursive: true, force: true })
    await fs.mkdirSync(tmpPath)
  

    const id = uuidV4().slice(0, 8)
    const pkgVersion = '1.0.0'
    const pkgName = `kzx-${id}`
    const description = fileName
  
    const pkgData = `
      {
        "name": "${pkgName}",
        "version": "${pkgVersion}",
        "author": "${author}",
        "description": "${description}"
      }
    `
    await fs.writeFileSync(pkgPath, pkgData)
    await fs.copyFileSync(filePath, path.join(tmpPath, fileName))
  
    console.log('npm publish ...')
    await publishPkg({ pkgName, description, tmpPath, author })
    console.log('publish finished')
    await fs.rmSync(tmpPath, { recursive: true, force: true })
    console.log(`包: ${pkgName} 发布成功`)

    return pkgData
  } catch (e) {
    console.log('报错了:',e)
    await fs.rmSync(tmpPath, { recursive: true, force: true })
    return e
  }
}

