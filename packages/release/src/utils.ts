import { isObject } from '@bassist/utils'

const GITHUB_URL = 'https://github.com/'
const DETAILS_LABEL = 'CHANGELOG'

// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository
interface Repository {
  type: string
  url: string
  directory: string
}

interface RepoInfo {
  repo: string
  directory: string
}

export function getRepo(repository?: Repository): RepoInfo | undefined {
  if (!repository || !isObject(repository)) return undefined
  const { url = '', directory = '' } = repository
  if (!url) return undefined

  if (url.startsWith('http')) {
    const repo = url.endsWith('.git') ? url.replace('.git', '') : url
    return { repo, directory }
  }

  if (url.startsWith('github:')) {
    const user = url.replace('github:', '')
    const repo = `${GITHUB_URL}${user}`
    return { repo, directory }
  }

  return undefined
}

function getTips(label = DETAILS_LABEL) {
  return ['Please refer to', label, 'for details.'].join(' ')
}

interface GetNotesOptions {
  repoInfo?: RepoInfo
  branch: string
  changelog: string
}

export function getNotes({ repoInfo, branch, changelog }: GetNotesOptions) {
  if (!repoInfo) return getTips()

  const url = [repoInfo.repo, 'blob', branch, repoInfo.directory, changelog]
    .filter((i) => !!i)
    .join('/')

  const label = `[${DETAILS_LABEL}](${url})`
  return getTips(label)
}

export function getName(name: string) {
  if (name.startsWith('@')) {
    const [, scopedName] = name.split('/')
    return scopedName
  }
  return name
}
