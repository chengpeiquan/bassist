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
    const context = this

    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}
