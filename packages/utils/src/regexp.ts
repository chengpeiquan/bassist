/**
 * Verify the mobile phone number format in mainland China
 *
 * @category Regexp
 */
export function isMob(phoneNumber: number | string) {
  return /^1[3456789]\d{9}$/.test(String(phoneNumber))
}

/**
 * Verify email format
 *
 * @category Regexp
 */
export function isEmail(email: string) {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
    email
  )
}

/**
 * Verify url format
 *
 * @category Regexp
 */
export function isUrl(url: string) {
  return /https?:\/\/[\w-]+(\.[\w-]+){1,2}(\/[\w-]{3,6}){0,2}(\?[\w_]{4,6}=[\w_]{4,6}(&[\w_]{4,6}=[\w_]{4,6}){0,2})?/.test(
    url
  )
}

/**
 * Verify the ID card number format in mainland China
 *
 * @category Regexp
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
 * @category Regexp
 */
export function isBankCard(bankCard: string) {
  return /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(bankCard)
}
