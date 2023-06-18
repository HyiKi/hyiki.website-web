/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/monitor',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Monitor',
  meta: {
    title: '系统监控',
    icon: 'monitor'
  },
  children: [
    {
      path: 'mysql',
      component: () => import('@/views/monitor/mysql'),
      name: 'mysql',
      meta: { title: '数据库监控 - MySQL' }
    },
    {
      path: 'custom/chart',
      component: () => import('@/views/monitor/custom-chart'),
      name: 'custom-chart',
      meta: { title: '自定义视图' }
    }
  ]
}

export default componentsRouter
