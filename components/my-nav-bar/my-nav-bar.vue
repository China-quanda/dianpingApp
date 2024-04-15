<template>
	<view class="my-nav-bar">
		<!-- <view class="status-bar"></view> -->
		<view class="placeholder" :style="{ height: navHeight + 'px' }"></view>
		<view class="container fixed top-0 z-9">
			<view class="relative flex flex-items-center justify-between px-3 box-border text-white"
				:style="{ height: navHeight + 'px', paddingTop: statusBarHeight + 'px' }">
				<view class="nav-left w10" @click="clickLeft">
					<slot name="nav-left">
						<view class="nav-left-btn w-7">
							<view class="nav-left-icon flex flex-items-center justify-center w7 h7 rd-full overflow-hidden"
								stylt="background-color:rgba(0, 0, 0, 0.2);">
								<my-icon icon="icon-xiangzuojiantou mb--0.35" color="white" bold></my-icon>
							</view>
						</view>
					</slot>
				</view>
				<view class="nav-default flex-1 text-4.7 text-center">
					<slot name="default"></slot>
				</view>
				<view class="nav-right w10 text-right">
					<slot name="nav-right"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
const statusBarHeight = ref(0);
const navHeight = ref(70);
onMounted(() => {
	// #ifdef APP
	const systemInfo = uni.getSystemInfoSync();
	navHeight.value = systemInfo.statusBarHeight! + 70;
	statusBarHeight.value = systemInfo.statusBarHeight!;
	// #endif
});
const clickLeft = () => {
	uni.navigateBack();
};
defineExpose({
	navHeight,
	statusBarHeight
});
</script>

<style lang="scss" scoped>
.container {
	background: linear-gradient(190deg, #ee4259, #f56817);

	.nav-left {
		.nav-left-btn {
			.nav-left-icon {
				background-color: rgba(0, 0, 0, 0.2);
			}
		}

	}
}
</style>
