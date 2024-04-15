<template>
	<my-nav-bar ref="navBarRef">数据管理</my-nav-bar>
	<view class="container" :style="{ height: `calc(100vh - ${navHeight}px)` }">
		<view class="menu-container z-1">
			<view class="menu-row">
				<view class="menu-col col-1" @click="navigateTo('manageChef')">
					<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
					<view class="menu-text">厨师管理</view>
				</view>
				<view class="menu-col col-2" @click="navigateTo('manageDishes')">
					<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
					<view class="menu-text">菜品管理</view>
				</view>
			</view>
			<view class="h-1.5rem"></view>
			<view class="menu-row">
				<view class="menu-col col-3" @click="setAPPBgPic">
					<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
					<view class="menu-text">应用图片</view>
				</view>
				<view class="menu-col col-4" @click="openAppNameDialog">
					<image class="menu-img" src="@/static/logo.png" mode="scaleToFill" />
					<view class="menu-text">应用名称</view>
				</view>
			</view>
		</view>
		<my-dialog :show="showAppNameDialog" title="应用名称" placeholder="请输入应用名称" mode="input" :value="appName"
			@confirm="confirm" @cancel="showAppNameDialog = false" />
	</view>
</template>

<script setup lang="ts">
import type { ISetting } from '@/typings/common';
import sqlite from '@/utils/sqlite.js';
const navHeight = ref(70);
const navBarRef = ref();
const showAppNameDialog = ref(false);
const appName = ref('');
onMounted(() => {
	navHeight.value = navBarRef.value.navHeight;
});
const openAppNameDialog = async () => {
	const appNameInfo: ISetting[] = await sqlite.selectTableData('dp_setting', 'key', 'appName');
	appName.value = appNameInfo[0].value;
	showAppNameDialog.value = true;
};
const setAPPBgPic = () => {
	uni.chooseImage({
		count: 1,
		sourceType: ['album'],
		sizeType: ['original'],
		success: async (res) => {
			const album = res.tempFilePaths[0];
			await sqlite.updateTableData('dp_setting', `value = '${album}'`, 'key', 'appBgPic');
			uni.showToast({
				title: '更换图片成功',
				icon: 'success',
				duration: 1500
			});
		},
		fail: (fail) => {
			if (fail.errMsg !== 'chooseImage:fail User cancelled') {
				uni.showToast({
					title: '更换图片失败',
					icon: 'fail',
					duration: 1500
				});
			}
		}
	});
};

const confirm = async (value: string) => {
	if (!value) return uni.showToast({ title: '请输入应用名称！', icon: 'none' });
	await sqlite.updateTableData('dp_setting', `value = '${value}'`, 'key', 'appName');
	uni.showToast({ title: '应用名称已设置' });
	showAppNameDialog.value = false;
};

const navigateTo = (url: string) => {
	uni.navigateTo({ url: `/pages/dataStatistics/${url}/index` });
};
</script>

<style scoped lang="scss">
.container {
	@apply flex bg-slate-200;
	position: relative;

	.menu-container {
		@apply px-8 py-9 bg-white rd-3 m5 p6 box-border w-full;

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
}
</style>
