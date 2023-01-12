<script setup>
import { ref, defineProps } from 'vue'

// props
defineProps({
  title: String
})

// model
const drawerRight = ref(false)
</script>

<template>
  <q-header class="rd-header">
    <q-toolbar
      class="justify-center"
      style="border-bottom: 1px solid #efefef; height: 70px"
    >
      <q-btn
        icon="arrow_back"
        flat
        dense
        class="navBack"
        round
        @click="$router.go(-1)"
      />
      <q-toolbar-title
        class="flex justify-center"
        style="font-size: 20px; font-weight: 600"
      >
        {{ title }}
      </q-toolbar-title>
      <q-btn
        flat
        round
        dense
        icon="menu"
        @click="drawerRight = !drawerRight"
      />
    </q-toolbar>
  </q-header>
</template>

<style lang="sass">
.rd-header
  background: linear-gradient(314deg, #b71c1c 4.67%, #760000 95.33%)
.navBack
  position: absolute
  left: 10px
</style>
