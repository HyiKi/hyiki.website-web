/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/file',
  component: Layout,
  redirect: 'noRedirect',
  name: 'File',
  meta: {
    title: '文件工具',
    icon: 'file'
  },
  children: [
    {
      path: 'encode',
      component: () => import('@/views/file/encode'),
      name: 'encode',
      meta: { title: '上传文件' }
    },
    {
      path: 'decode',
      component: () => import('@/views/file/decode'),
      name: 'decode',
      meta: { title: '下载文件' }
    }
  ]
}

export default componentsRouter
