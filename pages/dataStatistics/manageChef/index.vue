<template>
  <my-nav-bar ref="navBarRef">
    厨师管理
    <template #nav-right>
      <view class="right-btn" @click="editStatus = !editStatus">
        <text class="text-3.5">{{ editStatus ? '完成' : '编辑' }}</text>
      </view>
    </template>
  </my-nav-bar>
  <view class="view-container overflow-y-auto" :style="{ height: `calc(100vh - ${navHeight}px)` }">
    <view scroll-y class="view-list overflow-y-auto">
      <view class="view-item" v-for="( item, index ) in  chers " :key="index">
        <image class="item-img" src="@/static/cher.png" mode="scaleToFill" />
        <view class="item-content">
          <view class="name ellipsis1">
            <text>厨师</text>
            <text>{{ item.name }}</text>
          </view>
          <view class="button-group" v-show="editStatus">
            <view class="btn-confirm" @click="editChef(item)">修改</view>
            <view class="border-left"></view>
            <view class="btn-cancel" @click="delChef(item)">删除</view>
          </view>
        </view>
      </view>
      <div class="h-15 w-full"></div>
    </view>
    <view class="absolute left-0 right-0 bottom-0 bg-white p-2 h15 box-border flex flex-items-center justify-center"
      v-if="true">
      <view class="flex flex-items-center" @click="showAddDialog = true">
        <my-icon icon="icon-ceshishenqing1"></my-icon>
        <text class="text-3.5 m-l-1" text-coolGray-8>添加厨师</text>
      </view>
    </view>
    <my-dialog :show="showEditDialog" title="厨师名称" mode="input" placeholder="请输入厨师名称" :value="cherInfo.name"
      @confirm="confirmEditCher" @cancel="showEditDialog = false" />
    <my-dialog :show="showDelDialog" confirmText="删除" @confirm="confirmDelCher" @cancel="showDelDialog = false">
      {{ `您正在进行删除厨师${cherInfo.name} ，是否删除？` }}
    </my-dialog>
    <my-dialog :show="showAddDialog" title="添加厨师" mode="input" placeholder="请输入厨师名称" @confirm="confirmAddCher"
      @cancel="showAddDialog = false" />
  </view>
</template>

<script setup lang="ts">
import type { IChef } from '@/typings/common';
import sqlite from '@/utils/sqlite.js';
const navHeight = ref(70)
const navBarRef = ref()
const editStatus = ref(false)
const showEditDialog = ref(false)
const showDelDialog = ref(false)
const showAddDialog = ref(false)
const cherInfo = ref<IChef>({
  id: 0,
  name: ''
})
const chers = ref<IChef[]>([])
const confirmEditCher = async (value: string) => {
  if (!value) return uni.showToast({ title: '请输入厨师名称！', icon: 'none' });
  await sqlite.updateTableData('dp_chef', `name = '${value}'`, 'id', `${cherInfo.value.id}`);
  uni.showToast({ title: '厨师名称已修改' });
  showEditDialog.value = false;
  getList()
}
const confirmDelCher = async () => {
  await sqlite.deleteTableData('dp_chef', 'id', `${cherInfo.value.id}`)
  uni.showToast({ title: '厨师已删除' });
  showDelDialog.value = false
  getList()
}
const confirmAddCher = async (value: string) => {
  if (!value) return uni.showToast({ title: '请输入厨师名称！', icon: 'none' });
  await sqlite.insertTableData('dp_chef', `'${value}'`, `'name'`);
  uni.showToast({ title: `厨师已添加` });
  showAddDialog.value = false;
  getList()
}
const editChef = (row: IChef) => {
  cherInfo.value = row
  showEditDialog.value = true
}
const delChef = (row: IChef) => {
  cherInfo.value = row
  showDelDialog.value = true
}

const getList = async () => {
  const list: IChef[] = await sqlite.selectTableData('dp_chef');
  chers.value = list
}


onMounted(() => {
  console.log('navBarRef', navBarRef.value);
  navHeight.value = navBarRef.value.navHeight
  getList()
})
</script>

<style scoped lang="scss">
.view-container {
  @apply bg-slate-200;


  .view-list {
    height: 100%;
    @apply flex px-2.5 p-t-2.5 box-border;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;



    .view-item {
      @apply flex flex-col box-border p2 rounded-md m-b-2.5 bg-white min-h-8.2rem max-h-10rem;
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
          @apply flex justify-around text-2.6 font-500 mt-1.5;
        }

        .button-group {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-top-color: #f5f5f5;
          border-top-style: solid;
          border-top-width: 1px;
          padding-top: 5px;

          font-size: 0.65rem;
          color: #333;

          .btn-confirm {
            color: #3197f6;
            display: flex;
            // flex: 1;
            width: 50%;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            // height: 45px;
          }

          .border-left {
            border-left-color: #f0f0f0;
            border-left-style: solid;
            border-left-width: 1px;
          }

          .btn-cancel {
            color: #f63131;
            width: 50%;
            display: flex;
            flex: 1;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            // height: 45px;
          }
        }

      }
    }
  }
}
</style>