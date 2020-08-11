<template>
    <TabBar>
        <tab-bar-item path="/home" activeColor="deepPink" >
            <img src="~assets/img/tabbar/home.svg"  slot="item-icon" alt="">
            <img src="~assets/img/tabbar/home_active.svg"  slot="item-icon-active" alt="">
            <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category"  activeColor="deepPink">
            <img src="~assets/img/tabbar/category.svg"  slot="item-icon" alt="">
            <img src="~assets/img/tabbar/category_active.svg"  slot="item-icon-active" alt="">
            <div slot="item-text">分类</div>
        </tab-bar-item >
        <tab-bar-item path="/shopcart"  activeColor="deepPink">
            <img src="~assets/img/tabbar/shopcart.svg"  slot="item-icon" alt="">
            <img src="~assets/img/tabbar/shopcart_active.svg"  slot="item-icon-active" alt="">
            <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile"  activeColor="deepPink">
            <img src="~assets/img/tabbar/profile.svg"  slot="item-icon" alt="">
            <img src="~assets/img/tabbar/profile_active.svg"  slot="item-icon-active" alt="">
            <div slot="item-text">我的</div>
        </tab-bar-item>
    </TabBar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: "Main-Bar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>