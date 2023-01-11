<script setup>
</script>

<template>
  <q-layout view="lhr Lpr lfr">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-page-container>

    <q-footer class="text-grey-5">
      <q-toolbar class="justify-center">
        <div class="copyright flex">
          <span>Copyright © 2023 Team R46D,</span>
          <span class="sup">RD</span>
          <span>디와</span>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="sass">
.fit-min
  min-width: 100%
  min-height: 100%
  height: 0px

.copyright
  font-size: 12px
  .sup
    font-size: 10px
    line-height: 14px


footer
  background: rgba(236, 239, 241, 0) !important
</style>
