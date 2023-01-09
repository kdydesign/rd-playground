<script setup>
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { query, getDocs, where} from 'firebase/firestore'
import { useQuasar, QSpinnerOrbit } from 'quasar'
import { todosRef } from '@/firebase'
import moment from 'moment'

import PopUp from '@/views/popup/PopUp.vue'
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

const $q = useQuasar()

const router = useRouter()

const isPopUpShow = ref(false)
const alliance = ref('rd')
const regTime = ref(moment())
const regTimeTxt = ref('-')
const dataList = ref([])

let regTimer = void 0

const timer = () => {
  regTimer = setTimeout(() => {
    if (regTimer) {
      clearTimeout(regTimer)
    }
    regTime.value = moment(regTime.value).subtract(1, 'seconds')
    regTimeTxt.value = moment(regTime.value).format('HH:mm:ss')
    timer()
  }, 1000)
}

onBeforeMount(() => {
  timer()
})

onUnmounted(() => {
  clearTimeout(regTimer)
})

function onRegistration () {
  router.push({ path: '/SelectOsiris' })
}

async function onOpenList (alli) {
  alliance.value = alli

  $q.loading.show({
    spinner: QSpinnerOrbit,
    spinnerSize: 100,
    spinnerColor: 'red-10',
    backgroundColor: 'grey-5',
  })

  try {
    const q = query(todosRef, where('alliance', '==', alliance.value))
    const snapShot = await getDocs(q)

    snapShot.forEach((doc) => {
      dataList.value.push(doc.data())
    })

    $q.loading.hide()
  } catch (err) {
    console.log(err)
  }

  $q.loading.hide()

  isPopUpShow.value = true
}

function onClosePopUp () {
  dataList.value = []
  isPopUpShow.value = false
}
</script>

<template>
  <div>
    <HeaderTop title="Osiris Registration" />

    <q-page
      class="page-a-padding full-width content-center justify-center flex"
    >
      <div
        class="q-mx-auto column"
        style="width: 500px; text-align: center"
      >
        <div class="col">
          <q-btn
            size="50px"
            round
            icon="supervised_user_circle"
            color="white"
            class="r-btn"
            @click="onRegistration"
          />

          <h2>{{ regTimeTxt }}</h2>

          <div class="rd-container q-pr-md q-pl-md">
            <span class="rd-sub-title float-left">지원 현황</span>

            <table class="status-table q-table">
              <colgroup>
                <col width="auto">
                <col width="auto">
                <col width="auto">
              </colgroup>

              <thead>
                <tr>
                  <th class="th-head">
                    RD
                  </th>
                  <th class="th-head">
                    PD
                  </th>
                  <th class="th-head">
                    YD
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <a
                      href="#"
                      style="text-decoration: underline;"
                      @click="onOpenList('rd')"
                    >14</a>
                  </td>
                  <td>
                    <a
                      href="#"
                      style="text-decoration: underline;"
                      @click="onOpenList('pd')"
                    >18</a>
                  </td>
                  <td>
                    <a
                      href="#"
                      style="text-decoration: underline;"
                      @click="onOpenList('yd')"
                    >21</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PopUp
        :show="isPopUpShow"
        :data-list="dataList"
        :alliance="alliance"
        @close="onClosePopUp"
      />
    </q-page>
  </div>
</template>

<style lang="sass">
.r-btn
  border-radius: 130px
  background: linear-gradient(270deg, #ED0000 4.5%, #B10000 95.5%) !important

.status-table.th-head
  font-size: 18px !important
  color: #fff

.status-table.q-table
  box-shadow: 0px 4px 9px rgb(0 0 0 / 11%)

.status-table
  thead
    background: linear-gradient(314deg, #ED0000 4.5%, #B10000 95.5%) !important
    border-radius: 10px

.status-table
  th, td
    border-right: 1px
    border-color: #adadad
    border-style: solid

  th:first-child
    border-radius: 6px 0 0 0

  th:last-child
    border-radius: 0 6px 0 0

  tr:first-child td:first-child
    border-radius: 0 0 0 6px

  tr:last-child td:last-child
    border-radius: 0 0 6px 0

  td a
    color: #930000
    font-weight: bold
    font-size: 16px !important

.rd-sub-title
  font-size: 12px
  margin: 0 0 5px 5px
  font-weight: 600
</style>
