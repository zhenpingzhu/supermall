<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-contorl :title="['流行','新款','精品']"  @tabclick="tabclick" ref="tabControl1" class="tab-control"  v-show="isTabFixed"></tab-contorl>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll" :pullUpLoad="true" @pullingUp="loadmore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-contorl :title="['流行','新款','精品']"  @tabclick="tabclick" ref="tabControl2" ></tab-contorl>
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
  import {debounce} from "common/utils";

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
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,

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
    mounted() {
      //3.监听item中图片加载完成
      const refresh=debounce(this.$refs.scroll.refresh,200)

      this.$bus.$on('itemImageLoad',()=>{
        // this.$refs.scroll && this.$refs.scroll.refresh();
        refresh();
      })

    }
    ,
    destroyed() {
      console.log('home destroy');
    },
    activated() {
       this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh();
    },
    deactivated() {
      console.log(this.$refs.scroll.getScrollY());
      this.saveY=this.$refs.scroll.getScrollY();
    }

    ,
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
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;


      },
      backclick(){
         this.$refs.scroll.scrollTo(0,0,500)
      },
      contentscroll(position){
        //1.判断BackTop是否显示
        this.isShowBackTop=(-position.y)>1000

        this.isTabFixed=(-position.y)>this.tabOffsetTop;


      },
      loadmore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        //4.获取tabControl的offsetTio
        //所有组件都有一个属性$el:用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

          //完成上拉加载更多
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

        /*在浏览器原生滚动时，为了导航不跟随一起滚动*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 9;*/

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

    .tab-control{
        position: relative;
        z-index: 9;
    }


</style>