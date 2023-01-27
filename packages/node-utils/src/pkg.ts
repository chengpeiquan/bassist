/**
 * Check the package name is valid
 *
 * @category pkg
 */
export function isValidPackageName(packageName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    packageName
  )
}

/**
 * Format the package name to valid
 *
 * @category pkg
 */
export function toValidPackageName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

/**
 * Get package manager info
 *
 * @category pkg
 */
export function getPackageManagerByUserAgent() {
  const defaultInfo = {
    name: '',
    version: '0.0.0',
  }

  try {
    const userAgent = process.env.npm_config_user_agent
    if (!userAgent) {
      return { ...defaultInfo }
    }

    const spec = userAgent.split(' ')[0]
    const [name, version] = spec.split('/')
    return { name, version }
  } catch (e) {
    return { ...defaultInfo }
  }
}
