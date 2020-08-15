import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import('views/home/Home')
const Category=()=>import('views/category/category')
const Profile=()=>import('views/profile/profile')
const Cart=()=>import('views/cart/cart')
const Detail=()=>import( "views/detail/Detail");
//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes=[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/shopcart',
    component:Cart
  },
  {
    path: '/home',
    component:Home
  },
  {
    path:'/detail/:iid',
    // path:'/detail',
    component:Detail
  }

]



const router =new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})


export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}