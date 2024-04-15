<script setup lang="ts">
	// import '@/static/font/iconfont.js'
	import { computed, reactive, watchEffect, useSlots } from 'vue';
	const slots = useSlots()
	const props = defineProps({
		type: {
			type: String,
			default: 'font-class'
		},
		className: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			require: true
		},
		size: {
			type: [String, Number],
			default: '16'
		},
		color: {
			type: String,
			default: '#8a8a8a'
		},
		bold: {
			type: Boolean,
			default: false
		},
		text: {
			type: String,
			default: ''
		},
		textSize: {
			type: String,
			default: '15px'
		},
		textColor: {
			type: String,
			default: '#141414'
		},
		textPos: {
			type: String,
			default: 'right'
		},
		space: {
			type: String,
			default: '3px'
		}
	});
	const style = reactive({
		icon: '',
		fontSize: '',
		color: '',
		fontWeight: '',

	});
	// 给图标添加上类名
	const svgClass = computed(() => {
		if (props.className) {
			return `svg-icon ${props.className}`;
		}
		return 'svg-icon';
	});

	const isText = computed(() => {
		if (!!slots.default || props.text) return true
		return false
	})

	const direction = computed(() => {
		if (props.textPos === 'right') return 'row'
		if (props.textPos === 'left') return 'row-reverse'
		if (props.textPos === 'bottom') return 'column'
		if (props.textPos === 'top') return 'column-reverse'
	})

	const space = computed(() => {
		if (props.textPos === 'right') return `0px 0px 0px ${props.space}`
		if (props.textPos === 'left') return `0px ${props.space} 0px 0px`
		if (props.textPos === 'bottom') return `${props.space} 0px 0px 0px`
		if (props.textPos === 'top') return `0px 0px ${props.space} 0px`
	})

	watchEffect(() => {
		style.icon = props.icon
		style.color = props.color
		style.fontSize = props.size + 'px'
		style.fontWeight = props.bold ? 'bold' : '400'
	})

	interface EmitsType {
		(e : 'click') : void;
	}
	const emit = defineEmits<EmitsType>();
</script>

<template>
	<view class="my-icon" @tap="emit('click')">
		<view v-if="type == 'font-class'" class="font-class">
			<i :class="'iconfont ' + icon" :style="style"></i>
			<text v-if="isText" class="text">
				<slot>{{text}}</slot>
			</text>
		</view>
		<template v-if="type == 'svg'">
			<svg :class="svgClass" aria-hidden="true" :style="style">
				<use :xlink:href="'#' + icon" :fill="color" />
			</svg>
		</template>
	</view>
</template>
<style scoped lang="scss">
	@import '@/static/iconfont/iconfont.css';
	.my-icon {
		display: inline-block;

		.font-class {
			display: flex;
			flex-direction: v-bind(direction);
			align-items: center;

			.text {
				margin: v-bind(space);
				color: v-bind('props.textColor');
				font-size: v-bind('props.textSize');
			}
		}

	}

	.svg-icon {
		width: 1em;
		height: 1em;
		position: relative;
		fill: currentColor;
		vertical-align: -2px;
	}
</style>