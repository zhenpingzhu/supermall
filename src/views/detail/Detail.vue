<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">

            <detail-swiper :topImages="topImages">
            </detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>

            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imgageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
        </scroll>


    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import Scroll from "components/common/scroll/Scroll";
  import {getDetail, Goods, Shop,GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},

      }
    },
    created() {
      //1.保存传入的iid
      // this.iid=this.$route.query.iid;

      this.iid = this.$route.params.iid;
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部的图篇轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详细数据
        this.detailInfo=data.detailInfo;

        //5.获取参数的信息
        this.paramInfo=new GoodsParam(data.itemParams,data.itemParams.rule)

      })

    },
    mounted() {
      console.log(this.iid);

    },
    methods:{
      imgageLoad(){
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
    #detail {
        height: 100vh;
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content{
       height: calc(100% - 44px);
    }
</style>s