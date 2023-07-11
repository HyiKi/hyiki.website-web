/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/es',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ES',
  meta: {
    title: 'ES查询工具',
    icon: 'search'
  },
  children: [
    {
      path: 'doc',
      component: () => import('@/views/es/doc'),
      name: 'doc',
      meta: { title: '录入文档' }
    },
    {
      path: 'match',
      component: () => import('@/views/es/match'),
      name: 'match',
      meta: { title: '搜索文档' }
    },
    {
      path: 'doc/id',
      component: () => import('@/views/es/doc-id'),
      name: 'doc-id',
      meta: { title: '精确搜索' }
    }
  ]
}

export default componentsRouter
