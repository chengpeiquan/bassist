import { isObject } from '@bassist/utils'

const GITHUB_URL = 'https://github.com/'
const DETAILS_LABEL = 'CHANGELOG'

// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository
interface Repository {
  type: string
  url: string
  directory: string
}

function getRepo(repository?: Repository) {
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
  repository?: Repository
  branch: string
  changelog: string
}

export function getNotes({ repository, branch, changelog }: GetNotesOptions) {
  const repoInfo = getRepo(repository)
  if (!repoInfo) return getTips()

  const url = [repoInfo.repo, 'blob', branch, repoInfo.directory, changelog]
    .filter((i) => !!i)
    .join('/')

  const label = `[${DETAILS_LABEL}](${url})`
  return getTips(label)
}
