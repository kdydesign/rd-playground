<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { loginStore } from '@/stores/login'
import { QSpinnerOrbit, useQuasar } from 'quasar'

import SignUpPopUp from '@/views/popup/SignUpPopUp.vue'

const $q = useQuasar()
const id = ref(void 0)
const pwd = ref(void 0)
const showpopup = ref(false)
const idForm = ref(void 0)
const passwordForm = ref(void 0)
const router = useRouter()
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from '@/firebase'

const store = loginStore()

const auth = getAuth()
const createAuth = getAuth(firebaseApp)

const isValidate = computed(() => {
  const isIDValidate = idForm.value.validate()
  const isPwdValidate = passwordForm.value.validate()

  return isIDValidate && isPwdValidate
})

async function onLogin () {
  if (isValidate.value) {
    $q.loading.show({
      spinner: QSpinnerOrbit,
      spinnerSize: 100,
      spinnerColor: 'red-10',
      backgroundColor: 'grey-5',
    })

    // await userLogin()

    signInWithEmailAndPassword(auth, id.value, pwd.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user

          store.$patch({
            userUID: user.uid
          })
          console.log('-->', user.uid)

          $q.notify({
            message: '로그인되었습니다.',
            type: 'positive'
          })


          router.push({ path: '/OsirisReg' })
          $q.loading.hide()
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('err -> ', errorCode)
          console.log('err -> ', errorMessage)

          $q.notify({
            message: '계정 정보가 옳바르지 않습니다.',
            type: 'negative'
          })
          $q.loading.hide()
        })

    // router.push({ path: '/OsirisReg' })
  }
}

function onJoinMember () {
  showpopup.value = true
  // router.push({ path: '/SignUp' })
}

function onSignUp ({email, password}) {
  $q.loading.show({
    spinner: QSpinnerOrbit,
    spinnerSize: 100,
    spinnerColor: 'red-10',
    backgroundColor: 'grey-5',
  })

  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user
        console.log(user)
        $q.notify({
          message: '가입되었습니다.',
          type: 'positive'
        })
        // ...
        showpopup.value = false
        $q.loading.hide()
      })
      .catch((err) => {
        console.log(err.code)
        console.log(err.message)
        $q.notify({
          message: '가입에 실패하였습니다.',
          type: 'negative'
        })
        $q.loading.hide()
      })
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

    <sign-up-pop-up
      :show="showpopup"
      @close="showpopup = false"
      @applySignUp="onSignUp"
    />
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
