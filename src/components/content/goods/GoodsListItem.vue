<template>
    <div class="good-item">
        <img :src="goodsItem.show.img" alt="">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:Object,
      default(){
        return{

        }
      }
    }
  }
</script>

<style scoped>
    .good-item{
        padding-bottom: 40px;
        position: relative;
    }
    .good-item img{
        width: 100%;
        border-bottom: 5px;
    }
    .goods-info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p{
        overflow: hidden;/*多余的隐藏*/
        text-overflow: ellipsis;/*文字多出来的地方省略*/
        white-space: nowrap;/*不换行*/
        margin-bottom: 3px;
    }

    .goods-info .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect{
        position: relative;
    }
    .goods-info .collect::before{
        content: '';
        position: absolute;
        left: -15px;
        top:-1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg")0 0/14px 14px;
    }

</style>