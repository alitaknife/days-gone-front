import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},

	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},

	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			name: 'Dashboard',
			component: () => import('@/views/dashboard/index'),
			meta: { title: 'Dashboard', icon: 'dashboard' }
		}]
	},

	{
		path: '/file-list',
		component: Layout,
		children: [
			{
				path: 'index',
				name: 'fileList',
				component: () => import('@/views/file-list/index'),
				meta: { title: '文件列表', icon: 'form' }
			}
		]
	},

	{
		path: '/upload',
		component: Layout,
		children: [
			{
				path: 'index',
				name: 'Upload',
				component: () => import('@/views/upload/index'),
				meta: { title: '上传', icon: 'form' }
			}
		]
	},

	{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router