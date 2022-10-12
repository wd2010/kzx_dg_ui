import cp from 'child_process'

export function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    })

    executedCommand.on('error', error => {
      console.log(error);
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
