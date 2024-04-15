<template>
	<view class="container">
		<view class="absolute top-40 left-1 right-1 z-2" @click="navigateTo('test')">test</view>
		<image class="w-full h-full z-0" :src="bgImg" mode="aspectFill" />
		<view class="menu-container z-1">
			<view class="menu-row">
				<view class="menu-col col-1" @click="navigateTo('commentToday')">
					<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
					<view class="menu-text">今日点评</view>
				</view>
				<view class="menu-col col-2" @click="navigateTo('commentFeature')">
					<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
					<view class="menu-text">特色点评</view>
				</view>
			</view>
			<view class="h-1.5rem"></view>
			<view class="menu-row">
				<view class="menu-col col-3" @click="navigateTo('individualityOrder')">
					<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
					<view class="menu-text">个性点餐</view>
				</view>
				<!-- #ifdef H5 -->
				<view class="menu-col col-4" @click="navigateTo('dataStatistics')">
					<!-- #endif -->
					<!-- #ifdef APP -->
					<view class="menu-col col-4" @click="showDialog = true">
						<!-- #endif -->
						<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
						<view class="menu-text">数据统计</view>
					</view>
				</view>
			</view>
			<view class="app-name">{{ appName }}</view>
			<my-dialog :show="showDialog" title="管理员登录" mode="input" placeholder="请输入管理员密码" confirmText="登录" password
				@confirm="confirm" @cancel="showDialog = false" />
		</view>
</template>

<script setup lang="ts">
import sqlite from '@/utils/sqlite.js';
const showDialog = ref(false)
const bgImg = ref('');
const appName = ref('')
onShow(() => {
	getAppName()
	getAppBgImg()
})
const getAppName = async () => {
	const appNameInfo = await sqlite.selectTableData('dp_setting', 'key', 'appName');
	appName.value = appNameInfo[0].value
}
const getAppBgImg = async () => {
	const appBgImgInfo = await sqlite.selectTableData('dp_setting', 'key', 'appBgPic');
	bgImg.value = appBgImgInfo[0].value
}

const confirm = async (value) => {
	if (!value) return uni.showToast({ title: '请输入管理员密码！', icon: 'none' });
	const admin = await sqlite.selectTableData('dp_setting', 'key', 'admin');
	if (value !== admin[0].value) return uni.showToast({ title: '管理员密码不正确！', icon: 'none' });
	showDialog.value = false;
	navigateTo('dataStatistics')
}
const navigateTo = (url: string) => {
	uni.navigateTo({ url: `/pages/${url}/index` });
};
</script>

<style lang="scss">
page,
.container {
	@apply bg-cyan h-100vh;
	position: relative;
	background: linear-gradient(180deg, rgb(243, 73, 47), #f9f9f9);
}

.container {
	// background: url('@/static/logo.png');
	background-size: cover;
}

.menu-container {
	@apply absolute bottom-18 px-8 py-9 left-4 right-4 bg-white radual-center rd-t-3;

	.menu-row {
		@apply flex justify-between;

		.col-1 {
			background: linear-gradient(180deg, #fb9b5f, #fa7c49);

			.menu-text {
				background-color: #fb9b5f;
			}
		}

		.col-2 {
			background: linear-gradient(180deg, #86cdf9, #6ab9fb);

			.menu-text {
				background-color: #86cdf9;
			}
		}

		.col-3 {
			background: linear-gradient(180deg, #7bd6cf, #59bfb4);

			.menu-text {
				background-color: #7bd6cf;
			}
		}

		.col-4 {
			background: linear-gradient(180deg, #fdcf77, #ffb957);

			.menu-text {
				background-color: #fdcf77;
			}
		}

		.menu-col {
			@apply flex flex-col justify-between flex-items-center bg-amber px-5 py-7.5 rd-2.5 box-border;
			width: calc(50% - 0.6rem);

			.menu-img {
				@apply w-3.5rem h-3.5rem rd-full overflow-hidden mb-4;
			}

			.menu-text {
				@apply text-center text-white text-2.8 py-1.3 w-full rd-full;
			}
		}
	}
}

.app-name {
	@apply absolute bottom-6 left-0 right-0 text-center text-#d56138 text-4.5 font-500;
}
</style>
