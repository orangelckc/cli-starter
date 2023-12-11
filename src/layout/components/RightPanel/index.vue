<script lang="ts" setup>
defineOptions({
  name: 'RightPanel',
})

const props = defineProps({
  buttonTop: {
    type: Number,
    default: 350,
  },
})

const show = ref(false)
</script>

<template>
  <div
    class="handle-button"
    :class="`t-[${props.buttonTop}px]`"
    @click="show = true"
  >
    <el-icon :size="24" class="i-ep-setting" />
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  @apply rounded-t-none cursor-pointer flex bg-[var(--v3-rightpanel-button-bg-color)] rounded-b-2
    text-white right-0 w-12 z-10 pointer-events-auto uno-center;
}
</style>
