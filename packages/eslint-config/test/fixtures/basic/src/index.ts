import { readFileSync } from 'node:fs'

export const loadFixturePackage = () =>
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
