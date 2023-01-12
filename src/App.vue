<script setup>
import { provide, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { QSpinnerOrbit, useQuasar } from 'quasar'

// components
import Layouts from '@/components/Layouts/Layouts.vue'

// composable api
const $q = useQuasar()
const route = useRoute()

// provide $q loader
provide('$loader', {
  show: () => {
    $q.loading.show({
      spinner: QSpinnerOrbit,
      spinnerSize: 100,
      spinnerColor: 'red-10',
      backgroundColor: 'grey-5',
    })
  },
  hide: () => {
    $q.loading.hide()
  }
})

// provide $q notify
provide('$notify', {
  show: (opts) => {
    $q.notify({ ...opts })
  }
})

/**
 * computed
 */

const bgStyle = computed(() => {
  return route.path === '/'
})
</script>

<template>
  <layouts :class="{'login-background': bgStyle}">
    <RouterView />
  </layouts>
</template>

<style lang="sass">
.q-loading.fullscreen
  backdrop-filter: blur(3px)

.login-background
 background: radial-gradient(141.55% 78.85% at 51% -3.85%, #bd0000 14%, rgb(0, 0, 0) 121%)
</style>
