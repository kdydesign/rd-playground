<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const id = ref(void 0)
const pwd = ref(void 0)
const cPwd = ref(void 0)
const uid = ref(void 0)
const name = ref(void 0)
const power = ref(void 0)

function onSignUpConfirm () {
  router.push({ path: '/'})

}
</script>

<template>
  <q-page class="page-a-padding full-width content-center justify-center flex">
    <div
      class="q-mx-auto column"
      style="width: 500px"
    >
      <div class="col q-gutter-y-lg">
        <q-input
          v-model="id"
          label="ID"
          outlined
          color="red"
        />

        <q-input
          v-model="pwd"
          label="Password"
          outlined
          color="red"
        />

        <q-input
          v-model="cPwd"
          label="Confirm Password"
          outlined
          color="red"
        />

        <q-input
          v-model="uid"
          label="UID"
          outlined
          color="red"
        />

        <q-input
          v-model="name"
          label="Name"
          outlined
          color="red"
        />

        <q-input
          v-model="power"
          label="Power"
          outlined
          color="red"
        />

        <div class="q-mt-lg float-right">
          <q-btn
            label="Sign Up"
            color="red"
            @click="onSignUpConfirm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>