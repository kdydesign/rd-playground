<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

const $q = useQuasar()

const regArr = ref([
  {
    key: 'rd',
    name: 'RD',
    date: '2023/02/07 11:00',
    numPeopleCnt: 24
  },
  {
    key: 'pd',
    name: 'PD',
    date: '2023/02/07 13:00',
    numPeopleCnt: 14
  },
  {
    key: 'yd',
    name: 'YD',
    date: '2023/02/08 15:30',
    numPeopleCnt: 8
  }
])

function onRegistration(key) {
  let findReg  = regArr.value.find(a => a.key === key)

  if (findReg.numPeopleCnt < 30) {
    findReg.numPeopleCnt++

    $q.notify({
      message: '신청되었습니다.',
      type: 'positive'
    })
  } else {
    $q.notify({
      message: '신청 인원을 초과하였습니다.',
      type: 'negative'
    })
  }
}

function getSectionClass(key) {
  return `rd-select-${key} text-white`
}
</script>
<template>
  <div>
    <HeaderTop title="Osiris Registration" />

    <q-page
      class="page-a-padding full-width content-center justify-center flex"
    >
      <div
        class="q-mx-auto column q-gutter-y-lg q-pr-md q-pl-md"
        style="width: 100%"
      >
        <div
          v-for="reg in regArr"
          :key="reg.key"
          class="col"
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
                flat
                @click="onRegistration(reg.key)"
              >
                신청
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
