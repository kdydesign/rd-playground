<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { setUserInfo } from '@/firebase/fireStore'

// inject global component
const $loader = inject('$loader')
const $notify = inject('$notify')

// composable api
const router = useRouter()

// components
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

// pinia
import { loginStore } from '@/stores/login'

const { userUID, setUserInfo: setStoreUserInfo } = loginStore()

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
async function onSignUpConfirm () {
  if (isValidate.value) {
    $loader.show()

    await setUserInfo(userUID, {
      uid: uid.value,
      name: name.value,
      power: power.value,
      alliance: alliance.value
    })

    setStoreUserInfo({
      uid: uid.value,
      name: name.value,
      power: power.value,
      alliance: alliance.value,
      level: 2
    }, userUID)

    $notify.show({
      message: 'In-Game 정보가 저장되었습니다.',
      type: 'positive'
    })

    $loader.hide()

    router.push({ path: '/OsirisReg' })
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
        class="q-mx-auto q-pl-md q-pr-md q-mt-md"
        style="width: 500px"
      >
        <div class="col q-gutter-y-xs rd-ingame-pannel">
          <div>
            <span class="input-title">UID <span class="input-require">*</span></span>
            <q-input
              ref="uidField"
              v-model.number="uid"
              type="number"
              outlined
              dense
              color="grey-8"
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
              color="grey-8"
              :rules="[(val) => !!val || '필수입력입니다.']"
            />
          </div>

          <div>
            <span class="input-title">Power</span>
            <q-input
              v-model.number="power"
              type="number"
              outlined
              dense
              color="grey-8"
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

          <div class="q-mt-lg rd-ingame-btn">
            <q-btn
              label="Confirm"
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

.rd-ingame-pannel
  background: #fff
  border-radius: 10px
  padding: 10px
  box-shadow: 0px 10px 11px 0px #c9c8c8c2

.rd-ingame-btn
  display: flex
  flex-direction: row-reverse
</style>
