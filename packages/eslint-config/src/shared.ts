const defaultPrefix = 'bassist'

/**
 * A flexible tool function for generating ESLint configuration naming tools. It
 * helps you quickly splice configuration names, ensure consistent namespaces,
 * and facilitate the organization and management of complex rule sets.
 *
 * @param prefix - A string representing the prefix for your configuration
 *   names.
 * @returns A function that concatenates the provided name segments with the
 *   given prefix.
 */
export const createGetConfigNameFactory = (prefix: string) => {
  const getConfigName = (...names: string[]): string => {
    const finalPrefix = prefix?.trim() || defaultPrefix
    return `${finalPrefix}/${names.join('/')}`
  }

  return getConfigName
}

// Provided for internal configuration
export const getConfigName = createGetConfigNameFactory(defaultPrefix)
