import { readdirSync, readJSONSync, writeFileSync } from '@withtypes/fs-extra'
import { resolve } from 'path'
import { hasKey } from '../packages/utils'

function getDeps(rootPath: string) {
  const pkg = readJSONSync(resolve(rootPath, './package.json'))
  const { dependencies, devDependencies, peerDependencies } = pkg
  const deps = {
    ...(dependencies || {}),
    ...(devDependencies || {}),
    ...(peerDependencies || {}),
  }

  return deps
}

function syncVersion(
  packageDeps: Record<string, string>,
  monorepoDeps: Record<string, string>
) {
  for (const key in packageDeps) {
    if (hasKey(packageDeps, key)) {
      packageDeps[key] = monorepoDeps[key]
    }
  }
}

async function run() {
  // Get all deps from the root of the monorepo
  const rootPath = resolve(__dirname, '..')
  const deps = getDeps(rootPath)

  // Possible dependent fields
  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies']

  // Read all packages info and sync deps versions
  const packages = readdirSync(resolve(rootPath, './packages'))
  packages.forEach((name) => {
    const pkgFilePath = resolve(rootPath, `./packages/${name}/package.json`)
    const pkg = readJSONSync(pkgFilePath)

    depTypes.forEach((type) => {
      if (hasKey(pkg, type)) {
        syncVersion(pkg[type], deps)
      }
    })

    const content = JSON.stringify(pkg, null, 2) + '\n'
    writeFileSync(pkgFilePath, content)
  })
}
run().catch((e) => {
  console.log(e)
})
