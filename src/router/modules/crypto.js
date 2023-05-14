/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/crypto',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Crypto',
  meta: {
    title: '加密工具',
    icon: 'letsencrypt'
  },
  children: [
    {
      path: 'totp',
      component: () => import('@/views/crypto/totp'),
      name: 'totp',
      meta: { title: 'TOTP' }
    },
    {
      path: 'md5',
      component: () => import('@/views/crypto/md5'),
      name: 'md5',
      meta: { title: 'MD5' }
    },
    {
      path: 'convert',
      component: () => import('@/views/crypto/convert'),
      name: 'convert',
      meta: { title: '进制转换' }
    }
  ]
}

export default componentsRouter
