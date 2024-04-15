<template>
	<my-nav-bar ref="navBarRef" v-if="true">菜品详情</my-nav-bar>
	<view class="view-container overflow-y-auto" :style="{ height: `calc(100vh - ${navHeight}px)` }">
		<view scroll-y class="view-list overflow-y-auto">
			<view class="view-form">
				<form @submit="formSubmit" @reset="formReset">
					<view class="form-item">
						<view class="label">菜品名称</view>
						<view class="content">
							<input v-model="dishesInfo.name" placeholder="菜品名称" />
						</view>
					</view>

					<view class="form-item">
						<view class="label">时间段</view>
						<view class="content">
							<radio-group @change="changeTimeFrameId">
								<label v-for="item in timeFrameList" :key="item.id">
									<radio :value="item.id" /><text>{{ item.name }}</text>
								</label>
							</radio-group>
						</view>
					</view>

					<view class="form-item">
						<view class="label">菜品类别</view>
						<view class="content">
							<picker :value="dishesInfo.category_id" :range="categoryList" range-key="name" @change="changeCategoryId">
								<view class="flex w-full justify-end">
									<view class="uni-input">{{ categoryName || '请选择' }}</view>
									<my-icon icon="icon-icon-right" size="20"></my-icon>
								</view>
							</picker>
						</view>
					</view>

					<view class="form-item">
						<view class="label">菜品厨师</view>
						<view class="content">
							<picker :value="dishesInfo.chef_id" :range="chefList" range-key="name" @change="changeChefId">
								<view class="flex w-full justify-end">
									<view class="uni-input">{{ chefName || '请选择' }}</view>
									<my-icon icon="icon-icon-right" size="20"></my-icon>
								</view>
							</picker>
						</view>
					</view>

					<view class="form-item column">
						<view class="label">菜品图片</view>
						<view class="content">
							<view class="upload-pic w-20 h-20" @click="chooseImage">
								<image v-if="dishesInfo.pic" class="w-full h-full rd-1" :src="dishesInfo.pic" mode="scaleToFill" />
								<view v-else class="flex flex-col flex-items-center justify-center w-full h-full  bg-amber rd-1">
									<my-icon icon="icon-24gl-pictures" size="20"></my-icon>
									<view class="text-gray text-2.5">上传图片</view>
								</view>
							</view>
						</view>
					</view>
				</form>
			</view>
			<view class="h-15 w-full"></view>
		</view>
		<view class="absolute left-0 right-0 bottom-0 bg-white p-2 h15 box-border flex flex-items-center justify-center"
			v-if="true">
			<view class="flex flex-items-center">
				<my-icon icon="icon-ceshishenqing1" size="20"></my-icon>
				<text class="text-4 m-l-1" text-coolGray-8>添加/编辑</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import sqlite from '@/utils/sqlite.js';
const navHeight = ref(70);
const navBarRef = ref();
const timeFrameList = ref([])
const categoryList = ref([])
const chefList = ref([])
const categoryName = ref('')
const chefName = ref('')
const dishesInfo = ref({
	id: 0,
	name: '1111',
	category_id: 0,
	chef_id: 0,
	vote_count: 0,
	pic: '',
	timeFrame_id: 0,
	create_time: new Date().getTime(),
	update_time: new Date().getTime()
});
onShow(() => {
	sqlite.selectTableData('dp_timeFrame').then(res => {
		timeFrameList.value = res;
	})
	sqlite.selectTableData('dp_dishes_category').then(res => {
		categoryList.value = res;
		console.log('res', res)
	})
	sqlite.selectTableData('dp_chef').then(res => {
		chefList.value = res;
		console.log('res', res)
	})


})
const changeTimeFrameId = (evt) => {
	dishesInfo.value.timeFrame_id = evt.detail.value;
}
const changeCategoryId = (evt) => {
	categoryList.value.forEach((item, index) => {
		if (index == evt.detail.value) {
			categoryName.value = item.name
			dishesInfo.value.category_id = item.id;
		}
	})
}
const changeChefId = (evt) => {
	chefList.value.forEach((item, index) => {
		if (index == evt.detail.value) {
			chefName.value = item.name
			dishesInfo.value.chef_id = item.id;
		}
	})
}
const chooseImage = async () => {
	const res = await uni.chooseImage({
		count: 1,
		sourceType: ['album'],
		sizeType: ['original']
	});
	dishesInfo.value.pic = res.tempFilePaths[0]
}

const formSubmit = (e) => {
	console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
	var formdata = e.detail.value
	uni.showModal({
		content: '表单数据内容：' + JSON.stringify(formdata),
		showCancel: false
	});
}

const formReset = (e) => {
	console.log('清空数据', e)
}

onMounted(() => {
	navHeight.value = navBarRef.value.navHeight;
});
</script>

<style scoped lang="scss">
.view-form {
	@apply bg-white rd-3 w-full p-1rem;

	.form-item {
		@apply flex flex-items-center py-2 h-14 box-border w-full;
		border-bottom: 1px solid #dedede;

		.label {
			min-width: 90px;
		}

		.content {
			width: 100%;

			.uni-label-pointer {
				margin-right: 10px;
			}

			uni-input {
				@apply p-2 rd-1 box-border;
				height: auto !important;
				border: 0.5px solid #dedede;
				display: block;
				width: 100%;


				.uni-input-wrapper {

					// text-align: end !important;
					.uni-input-placeholder {
						text-align: end;
					}


					.uni-input-input {}
				}
			}
		}
	}

	.column {
		@apply flex-col flex-items-start h-auto;

		.label {
			min-width: 100%;
		}

		.content {
			margin-top: 5px;
		}
	}
}

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

				.cher {
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
