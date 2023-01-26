<script setup>
import { inject, onBeforeMount, reactive, ref } from 'vue'
import { setRegOsiris, getOsirisRegCnt, getRegOsiris, deleteRegOsiris } from '@/firebase/fireStore'

// inject global component
const $loader = inject('$loader')
const $notify = inject('$notify')

// pinia
import { loginStore } from '@/stores/login'

const { userUID, name, power, uid, alliance } = loginStore()

// components
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

// model
const rdRegCnt = ref(0)
const pdRegCnt = ref(0)
const ydRegCnt = ref(0)
const regArr = reactive([
  {
    key: 'rd',
    name: 'RD',
    date: '2023/02/07 11:00',
    numPeopleCnt: rdRegCnt
  },
  {
    key: 'pd',
    name: 'PD',
    date: '2023/02/07 13:00',
    numPeopleCnt: pdRegCnt
  },
  {
    key: 'yd',
    name: 'YD',
    date: '2023/02/08 15:30',
    numPeopleCnt: ydRegCnt
  }
])
const userRegInfo = ref(void 0)

/**
 * life cycle
 */
onBeforeMount(async () => {
  $loader.show()

  await getRegOsirisList()

  $loader.hide()
})

/**
 * methods
 */

async function getRegOsirisList () {
  const [rdCnt, pdCnt, ydCnt] = await Promise.all([
    await getOsirisRegCnt('rd'),
    await getOsirisRegCnt('pd'),
    await getOsirisRegCnt('yd')
  ])

  userRegInfo.value = await getRegOsiris(userUID)

  rdRegCnt.value = rdCnt
  pdRegCnt.value = pdCnt
  ydRegCnt.value = ydCnt
}

// osiris registration
async function onRegistration (key) {
  $loader.show()

  await setRegOsiris(key, userUID, {
    name,
    power,
    alliance,
    uid
  })
  await getRegOsirisList()

  $loader.hide()

  let findReg = regArr.find(a => a.key === key)

  if (findReg.numPeopleCnt < 30) {
    findReg.numPeopleCnt = await getOsirisRegCnt(key)

    $notify.show({
      message: '신청되었습니다.',
      type: 'positive'
    })
  } else {
    $notify.show({
      message: '신청 인원을 초과하였습니다.',
      type: 'negative'
    })
  }
}

async function onCancelRegistration(key) {
  $loader.show()

  await deleteRegOsiris(key, userUID)
  await getRegOsirisList()

  $loader.hide()

  $notify.show({
    message: '신청이 취소되었습니다.',
    type: 'positive'
  })
}

function getSectionClass (key) {
  return `rd-select-${key} text-white`
}

function getShowRegBtn (key) {
  if (userRegInfo.value) {
    const alli = userRegInfo.value.alliance

    return alli !== key
  }

  return false

}
</script>
<template>
  <div>
    <HeaderTop title="Osiris Registration" />

    <q-page
      class="page-a-padding full-width justify-center flex"
    >
      <div
        class="q-mx-auto q-pr-md q-pl-md q-mt-md"
        style="width: 100%"
      >
        <div
          v-for="reg in regArr"
          :key="reg.key"
          class="q-mt-lg"
        >
          <q-card class="my-card">
            <q-card-section :class="getSectionClass(reg.key)">
              <div class="text-h6">
                {{ reg.name }}
              </div>
              <div class="text-subtitle2">
                <span>{{ reg.date }}</span>
                <span class="float-right">{{ reg.numPeopleCnt }}명 지원중</span>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                v-if="getShowRegBtn(reg.key)"
                :disable="getShowRegBtn(reg.key)"
                flat
                @click="onRegistration(reg.key)"
              >
                신청
              </q-btn>

              <q-btn
                v-else
                flat
                @click="onCancelRegistration(reg.key)"
              >
                취소
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>

<style lang="sass">
.rd-select-rd
  background: linear-gradient(314deg, #ED0000 4.5%, #B10000 95.5%) !important

.rd-select-pd
  background: linear-gradient(314deg, #004bed 4.5%, #0018b1 95.5%) !important

.rd-select-yd
  background: linear-gradient(314deg, #edb600 4.5%, #b18800 95.5%) !important

.notify-cls
  background: #B10000
</style>
