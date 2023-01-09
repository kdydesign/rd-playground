<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { loginStore } from '@/stores/login'

const id = ref(void 0)
const pwd = ref(void 0)
const idForm = ref(void 0)
const passwordForm = ref(void 0)
const router = useRouter()

const { userLogin } = loginStore()

const isValidate = computed(() => {
  const isIDValidate = idForm.value.validate()
  const isPwdValidate = passwordForm.value.validate()

  return isIDValidate && isPwdValidate
})

async function onLogin() {
  if (isValidate.value) {
    await userLogin()
    router.push({ path: '/OsirisReg' })
  }
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
            ref="idForm"
            v-model="id"
            name="id"
            label="ID"
            color="red"
            :rules="[(val) => !!val || '필수입력입니다.']"
          >
            <template #prepend>
              <q-icon name="perm_identity" />
            </template>
          </q-input>
        </div>

        <div class="col q-mt-md">
          <q-input
            ref="passwordForm"
            v-model="pwd"
            label="PASSWORD"
            color="red"
            :rules="[(val) => !!val || '필수입력입니다.']"
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
          @click.stop.prevent="onJoinMember"
        >
          Sign Up
        </a>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass">

.r-btn
  border-radius: 40px
  background: linear-gradient(270deg, #ED0000 4.5%, #B10000 95.5%) !important
  height: 50px !important

.login-box
  width: 400px
</style>
