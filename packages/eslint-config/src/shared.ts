const prefix = 'bassist'

export const getConfigName = (...names: string[]): string => {
  return `${prefix}/${names.join('/')}`
}
