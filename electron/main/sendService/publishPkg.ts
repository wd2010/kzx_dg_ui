import { publish } from "libnpmpublish";
import pack from "libnpmpack";
import { dialog } from 'electron';

export const publishPkg = async ({ pkgName, description, tmpPath, author }) => {
  try {
    const authToken = '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'

    const manifest = {
      name: pkgName,
      version: '1.0.0',
      description,
      author,
    };

    console.log(author);

    const tarData = await pack(tmpPath, {});

    const result = await publish(manifest, tarData, {
      forceAuth: {
        token: authToken
      }
    })

    console.log('publish 成功')

  } catch (e) {
    console.log(e.statusCode)
    dialog.showErrorBox('publish 失败', e.message)
    throw e
  }

}
