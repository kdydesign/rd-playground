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
    </q-layout>
  </div>
</template>

<style lang="sass">
.fit-min
  min-width: 100%
  min-height: 100%
  height: 0px
</style>
