<script setup>
import { defineProps, toRefs, ref, defineEmits, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
})
const emits = defineEmits(['applySignUp'])

const email = ref(void 0)
const pwd = ref(void 0)
const emailField = ref(void 0)
const pwdField = ref(void 0)

const { show } = toRefs(props)


const isValidate = computed(() => {
  const isIDValidate = emailField.value.validate()
  const isPwdValidate = pwdField.value.validate()

  return isIDValidate && isPwdValidate
})

function onApplySignUp () {
  if (isValidate.value) {
    emits('applySignUp', {email: email.value, password: pwd.value})
  }
}
</script>
<template>
  <q-dialog
    v-model="show"
    persistent
  >
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Sign Up
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span class="input-title">E-Mail (ID) <span class="input-require">*</span></span>
        <q-input
          ref="emailField"
          v-model="email"
          outlined
          dense
          color="red"
          :rules="[(val) => !!val || '필수입력입니다.']"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span class="input-title">Password <span class="input-require">*</span></span>
        <q-input
          ref="pwdField"
          v-model="pwd"
          outlined
          dense
          color="red"
          :rules="[(val) => !!val || '필수입력입니다.']"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary"
      >
        <q-btn
          flat
          label="Cancel"
          @click="$emit('close')"
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
