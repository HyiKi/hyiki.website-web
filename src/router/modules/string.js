/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/string',
  component: Layout,
  redirect: 'noRedirect',
  name: 'String',
  meta: {
    title: '字符串工具',
    icon: 'string'
  },
  children: [
    {
      path: 'escape',
      component: () => import('@/views/string/escape'),
      name: 'escape',
      meta: { title: '转义字符串' }
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
