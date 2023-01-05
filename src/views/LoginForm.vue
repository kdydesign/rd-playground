<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const id = ref(void 0)
const pwd = ref(void 0)
const router = useRouter()

function onLogin() {
  router.push({ path: '/OsirisReg' })
}

function onJoinMember() {
  router.push({ path: '/SignUp' })
}
</script>

<template>
  <q-page class="page-a-padding full-width content-center justify-center flex">
    <div
      class="q-mx-auto column"
      style="width: 76vw"
    >
      <div
        class="q-mx-auto"
        style="width: 62vw"
      >
        <div class="col">
          <q-input
            v-model="id"
            label="ID"
            color="red"
          >
            <template #prepend>
              <q-icon name="perm_identity" />
            </template>
          </q-input>
        </div>

        <div class="col q-mt-md">
          <q-input
            v-model="pwd"
            label="PASSWORD"
            color="red"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="col q-mt-xl">
        <q-btn
          rounded
          label="LOGIN"
          color="red"
          class="r-btn fit"
          @click="onLogin"
        />
        <a
          href="#"
          class="float-right q-mt-md q-mr-lg"
          style="text-decoration: none"
          @click="onJoinMember"
        >
          Sign Up
        </a>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass">
.page-a-padding
  padding: 0px 40px

.r-btn
  border-radius: 40px
  background: linear-gradient(270deg, #ED0000 4.5%, #B10000 95.5%) !important

.login-box
  width: 400px
</style>
