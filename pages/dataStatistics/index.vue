<template>
  <my-nav-bar ref="navBarRef">数据统计</my-nav-bar>
  <view class="container" :style="{ height: `calc(100vh - ${navHeight}px)` }">
    <view class="bg-white rd-3 m5 p6 box-border w-full">
      <button class="button commentToday">今日点评数据</button>
      <button class="button commentFeature">特色点评数据</button>
      <button class="button individualityOrder">个性点餐数据</button>
      <button class="button dataStatistics" @click="navigateTo('manageData')">数据管理</button>
    </view>
  </view>
</template>

<script setup lang="ts">
const navHeight = ref(70)
const navBarRef = ref()
onMounted(() => {
  navHeight.value = navBarRef.value.navHeight
})
const navigateTo = (url: string) => {
  uni.navigateTo({ url: `/pages/dataStatistics/${url}/index` });
};
</script>

<style scoped lang="scss">
.container {
  @apply flex bg-slate-200;

  .button {
    @apply m-b-5 rd-full text-white text-3.8 py-0.5;

    &:after {
      @apply border-0
    }
  }

  .commentToday {
    background: linear-gradient(-180deg, #b7dcfa, #82b9f4);
  }

  .commentFeature {
    background: linear-gradient(-180deg, #ace7e3, #77cac3);
  }

  .individualityOrder {
    background: linear-gradient(-180deg, #f7d191, #f4b861);
  }

  .dataStatistics {
    background: linear-gradient(-180deg, #f4b476, #e96a2e);
  }
}
</style>