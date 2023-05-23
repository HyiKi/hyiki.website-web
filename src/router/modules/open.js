/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/open',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Open',
  meta: {
    title: '开放工具',
    icon: 'open-platform'
  },
  children: [
    {
      path: 'baidu/translate',
      component: () => import('@/views/open/baidu-translate'),
      name: 'baidu-translate',
      meta: { title: '百度翻译' }
    },
    {
      path: 'speech/synthesis',
      component: () => import('@/views/open/speech-synthesis'),
      name: 'speech-synthesis',
      meta: { title: 'Text to Speech' }
    }
  ]
}

export default componentsRouter
