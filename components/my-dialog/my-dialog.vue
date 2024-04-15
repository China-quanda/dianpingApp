<template>
  <view class="dialog-container" v-if="show">
    <view class="mask"></view>
    <view class="content">
      <view class="dialog-wrapper">
        <view class="dialog-title">{{ title }}</view>
        <view class="dialog-content">
          <template v-if="mode === 'input'">
            <input class="input" :type="inputType" v-model="inputValue" :confirm-type="confirmType" :password="password"
              focus :placeholder="placeholder" @confirm="confirm" />
          </template>
          <template v-else>
            <view class="dialog-default text-coolGray-5">
              <slot name="default"></slot>
            </view>
          </template>
        </view>
        <view class="dialog-button-group">
          <view class="btn-cancel" @click="cancel">{{ cancelText }}</view>
          <view class="border-left"></view>
          <view class="btn-confirm" @click="confirm">{{ confirmText }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '提示'
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  //对话框模式
  mode: {
    type: String,
    default: 'base', //可选值：base（提示对话框）/input（可输入对话框）
    validator(value: string) {
      return ['base', 'input'].includes(value);
    }
  },
  inputType: {
    type: String,
    default: 'text'
  },
  password: {
    type: Boolean,
    default: false
  },
  confirmType: {
    type: String,
    default: 'done'
  },
  value: {
    type: String,
    default: ''
  }
})

watchEffect(() => {
  if (props.show) {
    inputValue.value = props.value
  }
})
const emit = defineEmits<{
  cancel: []
  confirm: [value: string]
}>()
const inputValue = ref('')
const confirm = () => {
  emit('confirm', inputValue.value.trim())
  inputValue.value = ''
}
const cancel = () => {
  inputValue.value = ''
  emit('cancel')
}
</script>

<style scoped lang="scss">
.dialog-container {
  position: fixed;
  z-index: 99;

  .mask {
    opacity: 1;
    position: fixed;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity 300ms ease 0ms, -webkit-transform 300ms ease 0ms, transform 300ms ease 0ms;
    transform-origin: 50% 50%;
  }

  .content {
    transform: scale(1);
    opacity: 1;
    position: fixed;
    display: flex;
    flex-direction: column;
    inset: 0px;
    justify-content: center;
    align-items: center;
    transition: opacity 300ms ease 0ms, -webkit-transform 300ms ease 0ms, transform 300ms ease 0ms;
    transform-origin: 50% 50%;

    .dialog-wrapper {
      width: 300px;
      border-radius: 11px;
      background-color: #fff;

      .dialog-title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top: 25px;
      }

      .dialog-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 20px;

        .input {
          flex: 1;
          font-size: 14px;
          border: 1px #eee solid;
          height: 40px;
          padding: 0 10px;
          border-radius: 5px;
          color: #555;
        }
      }

      .dialog-button-group {
        display: flex;
        flex-direction: row;
        border-top-color: #f5f5f5;
        border-top-style: solid;
        border-top-width: 1px;

        font-size: 16px;
        color: #333;

        .btn-confirm {
          color: #007aff;
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 45px;
        }

        .border-left {
          border-left-color: #f0f0f0;
          border-left-style: solid;
          border-left-width: 1px;
        }

        .btn-cancel {
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 45px;
        }
      }
    }
  }
}
</style>