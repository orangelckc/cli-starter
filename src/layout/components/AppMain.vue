<script lang="ts" setup>
import { useTagsViewStore } from '@/store'

defineOptions({
  name: 'AppMain',
})

const tagsViewStore = useTagsViewStore()
</script>

<template>
  <section class="app-main">
    <RouterView v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="route" />
        </keep-alive>
      </transition>
    </RouterView>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  position: relative;

  overflow: hidden;

  width: 100%;
  min-height: calc(100vh - var(--v3-navigationbar-height));

  background-color: var(--v3-body-bg-color);
}

.fixed-header + .app-main {
  overflow: auto;
  height: 100vh;
  padding-top: var(--v3-navigationbar-height);
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }

  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
