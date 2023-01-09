<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import HeaderTop from '@/components/Layouts/HeaderTop.vue'

const router = useRouter()
const $q = useQuasar()

const id = ref(void 0)
const pwd = ref(void 0)
const cPwd = ref(void 0)
const uid = ref(void 0)
const name = ref(void 0)
const power = ref(void 0)
const alliance = ref('rd')

const idField = ref(void 0)
const pwdField = ref(void 0)
const cPwdField = ref(void 0)
const uidField = ref(void 0)
const nameField = ref(void 0)

const isValidate = computed(() => {
  const isIDValidate = idField.value.validate()
  const isPwdValidate = pwdField.value.validate()
  const isCpwdValidate = cPwdField.value.validate()
  const isUidValidate = uidField.value.validate()
  const isNameValidate = nameField.value.validate()

  return isIDValidate && isPwdValidate && isCpwdValidate && isUidValidate && isNameValidate
})

function onSignUpConfirm() {
  if (isValidate.value) {
    $q.notify({
      message: '가입되었습니다.',
      type: 'positive'
    })

    // router.push({ path: '/' })
  }
}
</script>

<template>
  <div>
    <HeaderTop title="Sign Up" />

    <q-page
      class="page-a-padding full-width content-center justify-center flex"
    >
      <div
        class="q-mx-auto column q-pl-md q-pr-md"
        style="width: 500px"
      >
        <div class="col q-gutter-y-xs">
          <div>
            <span class="input-title">ID <span class="input-require">*</span></span>
            <q-input
              ref="idField"
              v-model="id"
              outlined
              dense
              color="red"
              :rules="[(val) => !!val || '필수입력입니다.']"
            />
          </div>

          <div>
            <span class="input-title">Password <span class="input-require">*</span></span>
            <q-input
              ref="pwdField"
              v-model="pwd"
              outlined
              dense
              color="red"
              :rules="[(val) => !!val || '필수입력입니다.']"
            />
          </div>

          <div>
            <span class="input-title">Confirm <span class="input-require">*</span></span>
            <q-input
              ref="cPwdField"
              v-model="cPwd"
              outlined
              dense
              color="red"
              :rules="[(val) => !!val || '필수입력입니다.']"
            />
          </div>

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
