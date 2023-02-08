import progress from 'nprogress'
import resource from 'nprogress/nprogress.css?inline'
import { loadRes } from '@bassist/utils'

loadRes({
  type: 'style',
  id: 'bassist-nprogress',
  resource,
})

export default progress
