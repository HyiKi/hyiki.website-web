/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/str',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Str',
  meta: {
    title: 'Str',
    icon: 'str'
  },
  children: [
    {
      path: 'escape-string',
      component: () => import('@/views/str/escape-string'),
      name: 'escape-string',
      meta: { title: 'escape-string' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    }
  ]
}

export default componentsRouter
