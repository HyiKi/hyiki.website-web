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
      path: 'unescape',
      component: () => import('@/views/string/unescape'),
      name: 'unescape',
      meta: { title: '反转义字符串' }
    },
    {
      path: 'json/pretty',
      component: () => import('@/views/string/json-pretty'),
      name: 'json-pretty',
      meta: { title: '美化JSON' }
    },
    {
      path: 'json/simplify',
      component: () => import('@/views/string/json-simplify'),
      name: 'json-simplify',
      meta: { title: '简化JSON' }
    },
    {
      path: 'xml/pretty',
      component: () => import('@/views/string/xml-pretty'),
      name: 'xml-pretty',
      meta: { title: '美化Xml' }
    },
    {
      path: 'xml/simplify',
      component: () => import('@/views/string/xml-simplify'),
      name: 'xml-simplify',
      meta: { title: '简化Xml' }
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
