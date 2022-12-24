/**
 * Extract numbers from text
 * @param text - Text to be processed
 * @param startsWithZero - Preserve the 0-starting format like `002`
 *
 * @category format
 */
export function extractNumber(text: string | number, startsWithZero = false) {
  text = text ? String(text) : ''
  text = text.replace(/[^\d]/g, '')

  if (text && !startsWithZero) {
    text = parseInt(text)
  }

  return String(text)
}

/**
 * Format amount with two decimal places
 * @param amount - Amount to be processed
 *
 * @category format
 */
export function formatAmount(amount: string | number) {
  amount = String(amount)
  if (!amount) return '0.00'

  const arr = amount.split('.')
  const integer = arr[0]
  const decimal = arr[1]

  // no decimals
  if (arr.length === 1) {
    return `${integer}.00`
  }

  // 1 decimal place
  if (decimal.length === 1) {
    return `${amount}0`
  }

  // Uniform returns two decimal places
  return Number(amount).toFixed(2)
}
