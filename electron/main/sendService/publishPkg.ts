import { publish } from "libnpmpublish";
import pack from "libnpmpack";
import { dialog } from 'electron';

export const publishPkg = async ({ pkgName, description, tmpPath, author, authToken }) => {
  try {
  
    const manifest = {
      name: pkgName,
      version: '1.0.0',
      description,
      author,
    };


    const tarData = await pack(tmpPath, {});

    await publish(manifest, tarData, {
      forceAuth: {
        token: authToken
      }
    })

    console.log('publish 成功')

  } catch (e) {
    if (e.statusCode && e.statusCode === 404) {
      dialog.showErrorBox('publish 失败: npm authToken 已失效,请更换', e.message)
    } else {
      dialog.showErrorBox('publish 失败: 网络异常', e.message)
    }
    throw e
  }

}
