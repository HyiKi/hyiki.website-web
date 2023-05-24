/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/time',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Time',
  meta: {
    title: '时间工具',
    icon: 'time'
  },
  children: [
    {
      path: 'parse',
      component: () => import('@/views/time/parse'),
      name: 'parse',
      meta: { title: '时间转换工具' }
    }
  ]
}

export default componentsRouter
