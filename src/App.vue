<script setup>
import { provide } from 'vue'
import { RouterView } from 'vue-router'
import { QSpinnerOrbit, useQuasar } from 'quasar'

// components
import Layouts from '@/components/Layouts/Layouts.vue'

// composable api
const $q = useQuasar()

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
</script>

<template>
  <layouts>
    <RouterView />
  </layouts>
</template>
