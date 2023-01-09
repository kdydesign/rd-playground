<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String
})
</script>

<template>
  <q-header class="bg-white text-black">
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
    </q-toolbar>
  </q-header>
</template>

<style lang="sass">
.navBack
  position: absolute
  left: 10px
</style>
