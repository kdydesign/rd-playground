<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const id = ref(void 0)
const pwd = ref(void 0)
const router = useRouter()

function onLogin() {
  router.push({ path: '/AboutView' })
}
</script>

<template>
  <q-page
    class="bg-yellow page-a-padding full-width content-center justify-center flex"
  >
    <div class="q-mx-auto column q-gutter-y-lg" style="width: 500px">
      <div class="col">
        <q-input v-model="id" label="ID" outlined color="red" />
      </div>

      <div class="col">
        <q-input v-model="pwd" label="PASSWORD" outlined color="red" />
      </div>

      <div class="col">
        <q-btn label="text" color="red" class="fit" @click="onLogin" />
      </div>
    </div>
  </q-page>
</template>

<style lang="sass">
.page-a-padding
  padding: 0px 40px
</style>
