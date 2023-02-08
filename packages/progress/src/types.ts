/* eslint-disable no-unused-vars */

/**
 * Types provided from @types/nprogress
 */
interface NProgressOptions {
  minimum: number
  template: string
  easing: string
  speed: number
  trickle: boolean
  trickleSpeed: number
  showSpinner: boolean
  parent: string
  positionUsing: string
  barSelector: string
  spinnerSelector: string
}

interface NProgress {
  version: string
  settings: NProgressOptions
  status: number | null

  configure(options: Partial<NProgressOptions>): NProgress
  set(number: number): NProgress
  isStarted(): boolean
  start(): NProgress
  done(force?: boolean): NProgress
  inc(amount?: number): NProgress
  trickle(): NProgress

  /* Internal */

  render(fromStart?: boolean): HTMLDivElement
  remove(): void
  isRendered(): boolean
  getPositioningCSS(): 'translate3d' | 'translate' | 'margin'
}

/**
 * Types of functionality that this plugin extends
 */
export interface Progress extends NProgress {
  /**
   *
   * @param color - A valid CSS color value or CSS variable
   *
   * @example use HEX
   *  progress.setColor('#ff0000')
   *
   * @example use RGB
   *  progress.setColor('rgb(255, 0, 0)')
   *
   * @example use RGBA
   *  progress.setColor('rgba(255, 0, 0, 1)')
   *
   * @example use CSS Variable
   *  progress.setColor('var(--color-primary)')
   */
  setColor: (color: string) => void
}
