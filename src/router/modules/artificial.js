/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/artificial',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Artificial',
  meta: {
    title: '智能工具',
    icon: 'artificial_fillPlus'
  },
  children: [
    {
      path: 'address/parse',
      component: () => import('@/views/artificial/address-parse'),
      name: 'address-parse',
      meta: { title: '地址解析' }
    },
    {
      path: 'ocr',
      component: () => import('@/views/artificial/ocr'),
      name: 'ocr',
      meta: { title: 'ocr文字识别' }
    },
    {
      path: 'crawler/image',
      component: () => import('@/views/artificial/crawler-image'),
      name: 'crawler-image',
      meta: { title: '图片查找' }
    }
  ]
}

export default componentsRouter
