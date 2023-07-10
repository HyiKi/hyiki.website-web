/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/excel',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Excel',
  meta: {
    title: 'Excel工具',
    icon: 'excel'
  },
  children: [
    {
      path: 'duplicate/agg',
      component: () => import('@/views/excel/duplicate-agg'),
      name: 'duplicate-agg',
      meta: { title: '去重聚合' }
    },
    {
      path: 'convert/pdf/stream',
      component: () => import('@/views/excel/convert-pdf-stream'),
      name: 'convert-pdf-stream',
      meta: { title: 'Excel转PDF' }
    }
  ]
}

export default componentsRouter
