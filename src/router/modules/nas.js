/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/nas',
  component: Layout,
  redirect: 'noRedirect',
  name: 'NAS',
  meta: {
    title: 'NAS工具',
    icon: 'nas'
  },
  children: [
    {
      path: 'download',
      component: () => import('@/views/nas/download'),
      name: 'download',
      meta: { title: '远程下载' }
    }
  ]
}

export default componentsRouter
