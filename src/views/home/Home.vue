<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll" :pullUpLoad="true" @pullingUp="loadmore">
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-contorl :title="['流行','新款','精品']" class="tab-control" @tabclick="tabclick"></tab-contorl>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
    </div>


</template>

<script>


  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  // import GoodsListItem from "components/content/goods/GoodsListItem";

  import NavBar from "components/common/navbar/NavBar";
  import TabContorl from "components/content/tabControl/TabContorl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "home",
    components: {

      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabContorl,
      GoodsList,
      Scroll,
      BackTop,
      // GoodsListItem,


    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop:false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list

      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods: {
      /*事件监听事件*/
      tabclick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }


      },
      backclick(){
         this.$refs.scroll.scrollTo(0,0,500)
      },
      contentscroll(position){
        this.isShowBackTop=(-position.y)>1000
      },
      loadmore(){
        this.getHomeGoods(this.currentType)
      },


      /*网络请求的方法*/
      getHomeMultidata() {
        getHomeMultidata().then(res => {

          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page;
          this.$refs.scroll.finishPullUp();
        })

      },



    }
  }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }


    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;

    }

    .tab-control {
        position: sticky;
        top: 44px;
    }
    .content{
        /*height: calc(100% - 93px);*/
        overflow: hidden;
        /*margin-top: 44px;*/
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;

    }
</style>