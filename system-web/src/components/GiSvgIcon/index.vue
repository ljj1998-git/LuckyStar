<template>
  <svg
    aria-hidden="true"
    :class="svgClass"
    v-bind="$attrs"
    :style="{ color, fill: color, width: iconSize, height: iconSize }"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
defineOptions({ name: 'GiSvgIcon' })

const props = withDefaults(defineProps<Props>(), {
  name: '',
  color: '',
  size: 20,
})

interface Props {
  name: string
  color?: string
  size?: string | number
}

// 判断传入的值，是否带有单位，如果没有，就默认用px单位
const getUnitValue = (value: string | number): string | number => {
  return /(px|em|rem|%)$/.test(value.toString()) ? value : `${value}px`
}

const iconSize = computed<string | number>(() => {
  return getUnitValue(props.size)
})

const iconName = computed(() => `#icon-${props.name}`)

const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`
  return 'svg-icon'
})
</script>

<style scoped lang="less">
.svg-icon {
  width: auto;
  height: auto;
  // fill: currentColor;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
