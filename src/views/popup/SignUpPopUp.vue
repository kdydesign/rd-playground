<script setup>
import { defineProps, toRefs, ref, defineEmits, computed } from 'vue'

//props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
})

// event emits
const emits = defineEmits(['applySignUp', 'close'])

// model
const userId = ref(void 0)
const userPassword = ref(void 0)
const userConfirmPassword = ref(void 0)
const userIdField = ref(void 0)
const userPwdField = ref(void 0)
const userConfirmPwdField = ref(void 0)

const { show } = toRefs(props)

/**
 * computed
 */

// validation check
const isValidate = computed(() => {
  const isIDValidate = userIdField.value.validate()
  const isPwdValidate = userPwdField.value.validate()
  const isConfirmPwdValidate = userConfirmPwdField.value.validate()

  return isIDValidate && isPwdValidate && isConfirmPwdValidate
})

/**
 * methods
 */

// apply signup
function onApplySignUp () {
  if (isValidate.value) {
    emits('applySignUp', {
      userId: userId.value,
      userPassword: userPassword.value
    })
  }
}

// popup close
function onCloseSignUpPopUp () {
  userId.value = void 0
  userPassword.value = void 0
  userConfirmPassword.value = void 0
  userIdField.value = void 0
  userPwdField.value = void 0
  userConfirmPwdField.value = void 0

  emits('close')
}
</script>
<template>
  <q-dialog
    v-model="show"
    persistent
    position="bottom"
    :class="['rd-signup-popup', {'p-show': show}]"
  >
    <q-card class="content-card">
      <q-card-section>
        <div class="text-h6">
          Sign Up
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span class="input-title">E-Mail (ID) <span class="input-require">*</span></span>
        <q-input
          ref="userIdField"
          v-model="userId"
          outlined
          dense
          color="grey-8"
          suffix="@power.rd"
          :rules="[
            (val) => !!val || '필수입력입니다.',
            (val) => val.length >= 6 || '최소 6글자이상입니다.',
            (val) => /^[a-zA-Z0-9+]*$/.test(val) || '영문으로만 가능합니다.'
          ]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span class="input-title">Password <span class="input-require">*</span></span>
        <q-input
          ref="userPwdField"
          v-model="userPassword"
          type="password"
          outlined
          dense
          color="grey-8"
          :rules="[
            (val) => !!val || '필수입력입니다.',
            (val) => val.length >= 6 || '최소 6자리이상입니다.'
          ]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span class="input-title">Confirm Password <span class="input-require">*</span></span>
        <q-input
          ref="userConfirmPwdField"
          v-model="userConfirmPassword"
          type="password"
          outlined
          dense
          color="grey-8"
          :rules="[
            (val) => !!val || '필수입력입니다.',
            (val) => val === userPassword || '입력한 비밀번호가 다릅니다.'
          ]"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary"
      >
        <q-btn
          flat
          label="Cancel"
          color="black"
          @click="onCloseSignUpPopUp"
        />

        <q-btn
          label="Sign Up"
          color="red-10"
          @click="onApplySignUp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="sass">
.rd-signup-popup
  transition: backdrop-filter 0.2s
  backdrop-filter: blur(3px) opacity(0)
  &.p-show
    backdrop-filter: blur(3px)
  .content-card
    min-width: 350px
    border-radius: 20px 20px 0px 0px !important
    transition: 2s -webkit-filter linear
  .q-card__section
    padding-bottom: 0px


.input-require
  color: $red-10
</style>
