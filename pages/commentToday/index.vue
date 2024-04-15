<template>
  <my-nav-bar ref="navBarRef">今日点评</my-nav-bar>
  <view class="scroll-view-container" :style="{ height: `calc(100vh - ${navHeight}px)` }">
    <scroll-view scroll-y class="left-scroll">
      <view :class="['left-view-item', activeIndex === category.id ? 'active' : '']" v-for="category in categorys"
        :key="category.id" @click="handleClickCategory(category.id)">{{
    category.name }}
      </view>
    </scroll-view>
    <scroll-view scroll-y class="right-scroll">
      <view class="right-view-item" v-for="( item, index ) in  20 " :key="index" @click="handleClickItem(item)">
        <image class="item-left-img" src="@/static/logo.png" mode="scaleToFill" />
        <view class="item-right-content">
          <view class="name ellipsis1">西红柿大虾麻辣拉面</view>
          <view class="chef-content">
            <text class="chef-name">厨师</text>
            <text class="chef-value">张萨</text>
          </view>
          <view class="star-content">
            <my-icon class="star-icon" icon="icon-shoucang1" />
            <my-icon class="star-icon" icon="icon-shoucang1" />
            <my-icon class="star-icon" icon="icon-shoucang1" />
            <my-icon class="star-icon" icon="icon-shoucang1" />
            <my-icon class="star-icon" icon="icon-shoucang1" />
          </view>
          <view class="tags-content">
            <view class="tag-item">中辣</view>
            <view class="tag-item">偏油</view>
            <view class="tag-item">偏淡</view>
            <view class="tag-item">偏酸</view>
            <view class="tag-item">偏咸</view>
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
    name: '早餐',
    id: 1
  },
  {
    name: '午餐',
    id: 2
  },
  {
    name: '晚餐',
    id: 3
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
.scroll-view-container {}

.scroll-view-container {
  @apply flex bg-slate-200;

  .left-scroll {
    height: 100%;
    @apply w18 box-border py2 bg-white;

    .active {
      @apply bg-slate-200 relative text-#d56138;

      &::before {
        @apply absolute top-0 left-0 bottom-0 w1 h-full;
        content: '';
        background: linear-gradient(190deg, #ee4259, #f56817);
      }
    }

    .left-view-item {
      @apply h14 lh-14 px2 box-border text-3.8 text-center;
      // border-b-1 border-solid border-b-gray-950
      border-bottom: 1px solid rgb(226 232 240);
    }
  }

  .right-scroll {
    height: 100%;
    @apply px-2.5 py-2.5 box-border;

    .right-view-item {
      @apply flex p2 gap-2 px-3 rounded-md m-b-2.5 bg-white;

      .item-left-img {
        @apply w17 h17 rounded-md;
      }

      .item-right-content {
        @apply flex-1 flex flex-col justify-between;

        .name {
          @apply text-2.8 font-500;
        }

        .chef-content {
          @apply flex gap-1;

          .chef-name,
          .chef-value {
            @apply text-coolGray-4 text-2.5;
          }
        }

        .star-content {
          @apply flex;

          .star-icon {
            @apply scale-70;
          }
        }

        .tags-content {
          @apply flex flex-wrap;

          .tag-item {
            @apply py-0.3 px-2 rounded-full text-2.3 text-coolGray-6 bg-coolGray-1 mr-1;
          }
        }
      }
    }
  }
}
</style>