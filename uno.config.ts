import { 
  defineConfig ,
  presetAttributify,
  presetUno,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
// import type { Preset, SourceCodeTransformer } from 'unocss'
// import { presetUni } from '@uni-helper/unocss-preset-uni'
export default defineConfig({
  presets: [
    presetUno(), // 添加 UnoCSS 的默认样式预设
    // presetUni(), // 添加 uniapp 的默认样式预设
    presetAttributify(),
    // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    // 启用 @apply 功能
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
  ],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
})