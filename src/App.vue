<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "components/content/Main-Bar/Main-Bar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
