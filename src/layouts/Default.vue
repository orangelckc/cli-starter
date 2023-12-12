<script setup lang="ts">

</script>

<template>
  <view class="container">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.container {
  @apply h-[calc(100vh-100rpx-env(safe-area-inset-bottom))] overflow-auto;
}
</style>
