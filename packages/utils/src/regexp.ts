/**
 * Verify the mobile phone number format in mainland China
 *
 * @category regexp
 */
export function isMob(phoneNumber: number | string) {
  return /^1[3456789]\d{9}$/.test(String(phoneNumber))
}

/**
 * Verify email format
 *
 * @category regexp
 */
export function isEmail(email: string) {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
    email
  )
}

/**
 * Verify url format
 *
 * @category regexp
 */
export function isUrl(url: string) {
  return /https?:\/\/[\w-]+(\.[\w-]+){1,2}(\/[\w-]{3,6}){0,2}(\?[\w_]{4,6}=[\w_]{4,6}(&[\w_]{4,6}=[\w_]{4,6}){0,2})?/.test(
    url
  )
}

/**
 * Verify the ID card number format in mainland China
 *
 * @category regexp
 */
export function isIdCard(idCardNumber: string) {
  // 18-digit ID number
  const digit18 =
    /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

  // 15-digit ID number
  const digit15 =
    /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/

  return digit18.test(idCardNumber) || digit15.test(idCardNumber)
}

/**
 * Verify the bank card number format in mainland China
 *
 * @category regexp
 */
export function isBankCard(bankCardNumber: string) {
  return /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(bankCardNumber)
}

/**
 * Verify the IP is IPv4
 *
 * @category regexp
 */
export function isIPv4(ip: string) {
  return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(
    ip
  )
}

/**
 * Verify the IP is IPv6
 *
 * @category regexp
 */
export function isIPv6(ip: string) {
  return /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/.test(
    ip
  )
}
