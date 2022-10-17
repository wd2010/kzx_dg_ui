import { publish } from "libnpmpublish";
import pack from "libnpmpack";
import { dialog } from 'electron';

export const publishPkg = async ({ pkgName, description, tmpPath }) => {
  try {
    const authToken = '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'

    const manifest = {
      name: pkgName,
      version: '1.0.0',
      description,
    };


    const tarData = await pack(tmpPath, {});

    const result = await publish(manifest, tarData, {
      forceAuth: {
        token: authToken
      }
    })

    console.log('publish 成功')

  } catch (e) {
    console.log(e)
    dialog.showErrorBox('publish 失败', e.message)
  }

}
