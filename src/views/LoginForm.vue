<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getLogin, getJoinAuth } from '@/firebase/fireAuth'
import { getUserInfo } from '@/firebase/fireStore'

// inject global component
const $loader = inject('$loader')
const $notify = inject('$notify')

// composable api
const router = useRouter()

// popup
import SignUpPopUp from '@/views/popup/SignUpPopUp.vue'

// pinia
import { loginStore } from '@/stores/login'

const { setUserInfo, setUserUID } = loginStore()

// model
const userId = ref(void 0)
const userPassword = ref(void 0)
const userIdForm = ref(void 0)
const userPasswordForm = ref(void 0)
const isShowSignUpPopUp = ref(false)

/**
 * computed
 */

// validation check
const isValidate = computed(() => {
  const isIDValidate = userIdForm.value.validate()
  const isPwdValidate = userPasswordForm.value.validate()

  return isIDValidate && isPwdValidate
})

/**
 * methods
 */

// login
async function onLogin () {
  if (isValidate.value) {
    $loader.show()

    const parseUserId = `${userId.value}@power.rd`
    const { result, status, errors } = await getLogin(parseUserId, userPassword.value)

    if (status === 'ok') {
      const user = result.user
      const isSuperUser = user.email === 'admin@power.rd'
      const userInfo = await getUserInfo(user.uid)

      setUserUID(user.uid)

      $notify.show({
        message: '로그인되었습니다.',
        type: 'positive'
      })

      $loader.hide()

      if (userInfo || isSuperUser) {
        await setUserInfo(userInfo, user.uid)
        await router.push({ path: '/OsirisReg' })
      } else {
        await router.push({ path: '/SignUp' })
      }
    }

    if (status === 'error') {
      $notify.show({
        message: '계정 정보가 옳바르지 않습니다.',
        type: 'negative'
      })

      $loader.hide()

      console.log('[getLogin]: ', errors)
    }
  }
}

// apply sign-up
async function onApplySignUp ({ userId: signUpID, userPassword: signUpPwd }) {
  $loader.show()

  const parseUserId = `${signUpID}@power.rd`
  const { status, errors } = await getJoinAuth(parseUserId, signUpPwd)

  if (status === 'ok') {
    $notify.show({
      message: '가입되었습니다.',
      type: 'positive'
    })

    isShowSignUpPopUp.value = false
    userId.value = signUpID
    userPassword.value = signUpPwd

    $loader.hide()
  }

  if (status === 'error') {
    $notify.show({
      message: '가입에 실패하였습니다.',
      type: 'negative'
    })

    $loader.hide()

    console.log('[getJoinAuth]: ', errors)
  }
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
            ref="userIdForm"
            v-model="userId"
            name="userId"
            label="E-mail (ID)"
            color="red"
            suffix="@power.rd"
            :rules="[(val) => !!val || '필수입력입니다.']"
          >
            <template #prepend>
              <q-icon name="perm_identity" />
            </template>
          </q-input>
        </div>

        <div class="col q-mt-md">
          <q-input
            ref="userPasswordForm"
            v-model="userPassword"
            type="password"
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
          @click.stop.prevent="isShowSignUpPopUp = true"
        >
          Sign Up
        </a>
      </div>
    </div>

    <!--Sign-up popup-->
    <sign-up-pop-up
      :show="isShowSignUpPopUp"
      @close="isShowSignUpPopUp = false"
      @applySignUp="onApplySignUp"
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
