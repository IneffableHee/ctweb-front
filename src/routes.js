import Vue from 'vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import echarts from './views/charts/index.vue'
import VueRouter from 'vue-router'

import zcjg from './views/charts/ZiChanJieGou/zczl.vue'

Vue.use(VueRouter)

let routes = [
	{
	    path: '/',
	    component: Login,
	    name: '',
	},
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    {
        path: '/',
        component: Home,
        name: 'home',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/home', component: echarts, name: 'echarts' }
        ]
    },
	
	
	{
	    path: '/',
	    component: Home,
	    name: 'home',
	    iconCls: 'fa fa-bar-chart',
	    children: [
	        { path: '/zczl', component: zcjg, name: 'zczl' }
	    ]
	},
	
	
	 {
	  path: '/404',
	  component: () => import('@/views/errorPage/404'),
	  hidden: true
	},
	{
	  path: '/401',
	  component: () => import('@/views/errorPage/401'),
	  hidden: true
	},
	{
	  path: '/UNAUTHENTICATED',
	  component: () => import('@/views/errorPage/UNAUTHENTICATED'),
	  hidden: true
	},
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
	
];

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     // next({ path: '/login' })
//   } else {
//     next()
//   }
// })

//router.afterEach(transition => {
//NProgress.done();
//});

export default router;