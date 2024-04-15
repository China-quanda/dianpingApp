<template>
	<my-nav-bar ref="navBarRef">
		菜品管理
		<template #nav-right>
			<view class="right-btn" @click="editStatus = !editStatus">
				<text class="text-3.5">{{ editStatus ? '完成' : '编辑' }}</text>
			</view>
		</template>
	</my-nav-bar>
	<view class="view-container overflow-y-auto" :style="{ height: `calc(100vh - ${navHeight}px)` }">
		<view scroll-y class="view-list overflow-y-auto">
			<view class="view-item" v-for="(item, index) in dishess" :key="index">
				<image class="item-img" src="@/static/dishes.png" mode="scaleToFill" />
				<view class="item-content">
					<view class="name ellipsis1">西红柿大虾麻辣拉面</view>
					<view class="name dishes ellipsis1">
						<text>厨师</text>
						<text>{{ item.name }}</text>
					</view>
					<view class="button-group" v-show="editStatus">
						<view class="btn-confirm" @click="editDishes(item)">修改</view>
						<view class="border-left"></view>
						<view class="btn-cancel" @click="delDishes(item)">删除</view>
					</view>
				</view>
			</view>
			<view class="h-15 w-full"></view>
		</view>
		<view class="absolute left-0 right-0 bottom-0 bg-white p-2 h15 box-border flex flex-items-center justify-center"
			v-if="true">
			<view class="flex flex-items-center" @click="addDishes">
				<my-icon icon="icon-ceshishenqing1"></my-icon>
				<text class="text-3.5 m-l-1" text-coolGray-8>添加菜品</text>
			</view>
		</view>

		<my-dialog :show="showDelDialog" confirmText="删除" @confirm="confirmDeldishes" @cancel="showDelDialog = false">
			{{ `您正在进行删除菜品${dishesInfo.name} ，是否删除？` }}
		</my-dialog>
	</view>
</template>

<script setup lang="ts">
import type { IDishes } from '@/typings/common';
import sqlite from '@/utils/sqlite.js';
const navHeight = ref(70);
const navBarRef = ref();
const editStatus = ref(false);
const showDelDialog = ref(false);
const dishesInfo = ref<IDishes>({
	id: 0,
	name: '',
	category_id: 0,
	chef_id: 0,
	vote_count: 0,
	pic: '',
	timeFrame_id: 0
});
const dishess = ref<IDishes[]>([]);


const editDishes = (id: number) => {
	uni.navigateTo({ url: `./info?type=edit&id=${id}` })
};

const addDishes = () => {
	uni.navigateTo({ url: `./info?type=add` })
};

const delDishes = (row: IDishes) => {
	dishesInfo.value = row;
	showDelDialog.value = true;
};

const confirmDeldishes = async () => {
	await sqlite.deleteTableData('dp_dishes', 'id', `${dishesInfo.value.id}`);
	uni.showToast({ title: '菜品已删除' });
	showDelDialog.value = false;
	getList();
};

const getList = async () => {
	const list: IDishes[] = await sqlite.selectTableData('dp_chef');
	dishess.value = list;
};

onMounted(() => {
	navHeight.value = navBarRef.value.navHeight;
	getList();
});
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
			@apply flex flex-col box-border p2 rounded-md m-b-2.5 bg-white min-h-8.2rem max-h-10.2rem;
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

				.dishes {
					@apply text-coolGray-5 mt-0;
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
