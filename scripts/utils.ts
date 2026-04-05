import minimist from '@withtypes/minimist'

/**
 * Get argv from Command Line
 */
export function getArgv() {
  const argv = minimist(process.argv.slice(2), { string: ['_'] })
  const { _, otp, tag } = argv
  const [name] = _

  if (!name) {
    const errArgs = [
      '',
      '🚧 Missing package name to generate declaration files.',
      '',
      '💡 Related command arguments and options:',
      '   bun run build:lib <package-name>',
      '   bun run pkg:publish <package-name> [--otp] [--tag]',
      '',
      '',
    ]
    const errMsg = errArgs.join('\n')
    throw new Error(errMsg)
  }

  return { name, otp, tag }
}
