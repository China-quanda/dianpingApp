<template>
  <my-nav-bar ref="navBarRef">个性点餐</my-nav-bar>
  <view class="tags-container">
    <view class="tag-item" :class="{ 'active': activeIndex === category.id }" v-for="category in categorys"
      :key="category.id" @click="handleClickCategory(category.id)">{{
      category.name }}</view>
  </view>
  <view class="view-container" :style="{ height: `calc(100vh - ${navHeight}px)` }">
    <view class="placeholder h-10"></view>
    <scroll-view class="view-scroll" scroll-x>
      <view class="view-list">
        <view class="view-item" v-for="( item, index ) in  10 " :key="index" @click="handleClickItem(item)">
          <image class="item-img" src="@/static/logo.png" mode="scaleToFill" />
          <view class="item-content">
            <view class="name ellipsis1">西红柿大虾拉面</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="section ">
      <view class="title ">已选菜品</view>
      <view class="btn ">提交</view>
    </view>

    <scroll-view class="view-scroll section-view-scroll" scroll-x>
      <view class="view-list ">
        <view class="view-item" v-for="( item, index ) in  10 " :key="index" @click="handleClickItem(item)">
          <image class="item-img" src="@/static/logo.png" mode="scaleToFill" />
          <view class="item-content">
            <view class="name ellipsis1">西红柿大虾拉面</view>
          </view>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script setup lang="ts">
const navHeight = ref(70)
const navBarRef = ref()
const activeIndex = ref(1)
const categorys = ref([
  {
    name: '荤菜',
    id: 1
  },
  {
    name: '素菜',
    id: 2
  },
  {
    name: '主食',
    id: 3
  },
  {
    name: '凉菜',
    id: 4
  }
])
const handleClickCategory = (id: number) => {
  activeIndex.value = id
}
const handleClickItem = (id: number) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${id}`
  })
}

onMounted(() => {
  console.log('navBarRef', navBarRef.value);
  navHeight.value = navBarRef.value.navHeight
})
</script>

<style scoped lang="scss">
.tags-container {
  @apply absolute left-0 right-0 z-10 flex flex-items-center justify-between h-10 px-4 rd-3 bg-white;
  /* #ifdef H5 */
  @apply top-15;

  /* #endif */
  /* #ifdef APP */
  margin-top: -10px;

  /* #endif */


  .tag-item {
    @apply px-4 h-6 lh-6 rounded-full text-3 text-coolGray-6 bg-coolGray-1 mr-1;
  }

  .active {
    @apply bg-slate-200 relative text-white;
    background: linear-gradient(190deg, #e86a38, #f58548);

  }
}

.view-container {
  @apply bg-slate-200;

  .section {
    @apply relative flex justify-between flex-items-center h-10 mx-2.5 p-l-2;

    &::before {
      position: absolute;
      @apply absolute left-0 top-3 bottom-3 w-0.7 rd-full;
      content: '';
      background: linear-gradient(190deg, #e86a38, #f58548);
    }

    .title {
      @apply text-3.5 font-500;
    }

    .btn {
      @apply text-2.4 text-white py-1.5 px-4 rd-full;
      background: linear-gradient(360deg, #e86a38, #f58548);
    }
  }

  .view-scroll {
    @apply flex px-2.5 box-border bg-white h-30;
  }

  .section-view-scroll {
    @apply h40;
  }

  .view-list {
    @apply flex box-borde py-2;

    .view-item {
      @apply flex flex-col box-border min-w-18 max-w-18 w-18 m-r-2;

      .item-img {
        @apply w-full rounded-md min-h-17 max-h-17 h-17;
      }

      .item-content {
        @apply flex-1 flex flex-col gap-1 justify-between;

        .name {
          @apply text-2.3 font-500 mt-1.5;
        }

      }
    }
  }

}
</style>