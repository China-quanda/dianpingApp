<template>
  <my-nav-bar ref="navBarRef">特色评选</my-nav-bar>
  <view class="tags-container">
    <view class="tag-item" :class="{ 'active': activeIndex === category.id }" v-for="category in categorys"
      :key="category.id" @click="handleClickCategory(category.id)">{{
      category.name }}</view>
  </view>
  <view class="view-container overflow-y-auto" :style="{ height: `calc(100vh - ${navHeight}px)` }">
    <view scroll-y class="view-list">
      <view class="view-item" v-for="( item, index ) in  20 " :key="index" @click="handleClickItem(item)">
        <image class="item-img" src="@/static/logo.png" mode="scaleToFill" />
        <view class="item-content">
          <view class="name ellipsis1">西红柿大虾麻辣拉面</view>
          <view class="content flex justify-between">
            <view class="chef">厨师 张萨</view>
            <view class="vote-number">票数15</view>
          </view>
          <view class="vote-btn">投票</view>
        </view>
      </view>
    </view>
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
  @apply flex bg-slate-200;


  .view-list {
    height: 100%;
    @apply flex px-2.5 py-2.5 box-border pt-10;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;



    .view-item {
      @apply flex flex-col box-border p2 rounded-md m-b-2.5 bg-white h-43.75;
      width: calc(33.7% - 0.5rem);

      &:not(:nth-child(3n)) {
        @apply m-r-2.5;

      }

      .item-img {
        @apply w-full h23.5 rounded-md;
        min-height: 5.875rem;
      }

      .item-content {
        @apply flex-1 flex flex-col gap-1 justify-between;

        .name {
          @apply text-2.3 font-500 mt-1.5;
        }

        .content {
          @apply flex;

          .chef,
          .vote-number {
            @apply text-coolGray-6 text-2.5;
          }
        }

        .vote-btn {
          @apply text-2.5 text-white py-1 h16px lh-16px text-center rd-full;
          background: linear-gradient(180deg, #f2cfaa, #e07537);
        }
      }
    }
  }
}
</style>