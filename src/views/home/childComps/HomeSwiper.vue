<template>
    <swiper>
        <swiper-item v-for="item in banners"  :key="item.acm">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default(){
          return{
            isLoad:false
          }
        }
      }
    },
    data(){
      return{}
    },
    methods:{
      imgLoad(){
        if (!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad=true
        }

      }
    }
  }
</script>

<style scoped>

</style>