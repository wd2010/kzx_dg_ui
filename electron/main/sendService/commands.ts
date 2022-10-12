import cp from 'child_process'
import {dialog} from 'electron';
export function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    })

    executedCommand.on('error', error => {
      console.log(error);
      // dialog.showErrorBox('错误信息', error.message)
      reject(error)
    })

    executedCommand.on('exit', code => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(code)
      }
    })
  })
}
