<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { setUserInfo } from '@/firebase/fireStore'

// inject global component
const $notify = inject('$notify')

// composable api
const router = useRouter()

// components
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

// pinia
import { loginStore } from '@/stores/login'

const { userUID } = loginStore()

// model
const uid = ref(void 0)
const name = ref(void 0)
const power = ref(void 0)
const alliance = ref('rd')
const uidField = ref(void 0)
const nameField = ref(void 0)

/**
 * computed
 */

// validation check
const isValidate = computed(() => {
  const isUidValidate = uidField.value.validate()
  const isNameValidate = nameField.value.validate()

  return isUidValidate && isNameValidate
})

/**
 * methods
 */

// sign-up
async function onSignUpConfirm() {
  if (isValidate.value) {
    await setUserInfo(userUID, {
      uid: uid.value,
      name: name.value,
      power: power.value,
      alliance: alliance.value
    })

    $notify.show({
      message: '가입되었습니다.',
      type: 'positive'
    })

    router.push({ path: '/' })
  }
}
</script>

<template>
  <div>
    <HeaderTop title="In-game Information" />

    <q-page
      class="page-a-padding full-width justify-center flex"
    >
      <div
        class="q-mx-auto column q-pl-md q-pr-md q-mt-md"
        style="width: 500px"
      >
        <div class="col q-gutter-y-xs">
          <div>
            <span class="input-title">UID <span class="input-require">*</span></span>
            <q-input
              ref="uidField"
              v-model="uid"
              outlined
              dense
              color="red"
              :rules="[(val) => !!val || '필수입력입니다.']"
            />
          </div>

          <div>
            <span class="input-title">Name <span class="input-require">*</span></span>
            <q-input
              ref="nameField"
              v-model="name"
              outlined
              dense
              color="red"
              :rules="[(val) => !!val || '필수입력입니다.']"
            />
          </div>

          <div>
            <span class="input-title">Power</span>
            <q-input
              v-model="power"
              outlined
              dense
              color="red-10"
              style="margin-bottom: 20px"
            />
          </div>


          <div>
            <span class="input-title">Alliance <span class="input-require">*</span></span>
            <q-btn-toggle
              v-model="alliance"
              unelevated
              toggle-color="red-10"
              color="white"
              text-color="red-10"
              spread
              :options="[
                { label: 'RD', value: 'rd' },
                { label: 'PD', value: 'pd' },
                { label: 'YD', value: 'yd' }
              ]"
              class="alliance-btn"
            />
          </div>

          <div class="q-mt-lg float-right">
            <q-btn
              label="Sign Up"
              color="red-10"
              @click="onSignUpConfirm"
            />
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<style lang="sass">
.input-title
  color: #333333

.input-require
  color: $red-10

.alliance-btn
  border: 1px solid $red-10
</style>
