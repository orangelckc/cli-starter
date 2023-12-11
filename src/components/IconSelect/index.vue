<script lang="ts" setup>
import { IconClass, getIcon } from '@/config/icons'

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    require: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const proxy = useVModel(props, 'modelValue', emit)

const icons = computed(() => Object.keys(IconClass))

watchEffect(() => proxy.value = props.modelValue)

/**
 * icon 选择
 */
function handleSelect(iconName: string) {
  emit('update:modelValue', iconName)
}
</script>

<template>
  <el-select v-model="proxy" placeholder="请选择图标" @change="handleSelect">
    <el-option
      v-for="icon in icons"
      :key="icon"
      :label="icon"
      :value="icon"
    >
      <span class="float-left">{{ icon }}</span>
      <span class="float-right"><el-icon :class="getIcon(icon)" /></span>
    </el-option>
  </el-select>
</template>
