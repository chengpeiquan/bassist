/**
 * Put the program to sleep for a while
 *
 * @category performance
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

/**
 * When an event is triggered frequently,
 * only execute the event processing function once.
 *
 * @category performance
 */
// eslint-disable-next-line no-unused-vars
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait = 200,
  // eslint-disable-next-line no-unused-vars
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | number

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

/**
 * Can control how often a function is called within a specified time interval
 *
 * @category performance
 */
// eslint-disable-next-line no-unused-vars
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout> | number | undefined
  let previous = 0

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0) {
      clearTimeout(timeout)
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = undefined
        func.apply(this, args)
      }, remaining)
    }
  }
}
