<script setup>
</script>

<template>
  <div>
    <q-layout view="lhr Lpr lfr">
      <q-page-container>
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page-container>

      <q-footer class="bg-white text-grey-5">
        <q-toolbar class="justify-center">
          <span>Copyright © 2023 Team R46D,
            <sup style="font-size: 10px">RD</sup>디와</span>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<style lang="sass">
.fit-min
  min-width: 100%
  min-height: 100%
  height: 0px
</style>
