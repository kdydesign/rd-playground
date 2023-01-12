<script setup>
import { ref, onBeforeMount, onUnmounted, nextTick, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getOsirisRegCnt, getOsirisRegList } from '@/firebase/fireStore'

import moment from 'moment'

// inject global component
const $loader = inject('$loader')

// composable api
const router = useRouter()

// components
import PopUp from '@/views/popup/PopUp.vue'
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

// model
const isPopUpShow = ref(false)
const alliance = ref('rd')
const regTime = ref(moment())
const regTimeTxt = ref('-')
const dataList = ref([])

const rdCnt = ref(0)
const pdCnt = ref(0)
const ydCnt = ref(0)

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

/**
 * life cycel
 */

onBeforeMount(async () => {
  timer()

  $loader.show()

  try {
    const [rd, pd, yd] = await Promise.all([
      await getOsirisRegCnt('rd'),
      await getOsirisRegCnt('pd'),
      await getOsirisRegCnt('yd')
    ])

    rdCnt.value = rd
    pdCnt.value = pd
    ydCnt.value = yd

    $loader.hide()
  } catch (err) {
    console.log(err)
  }

})

onUnmounted(() => {
  clearTimeout(regTimer)
})

/**
 * methods
 */

// osiris 등록 페이지 이동
function onRegistration () {
  router.push({ path: '/SelectOsiris' })
}

// 등록된 osiris 목록 확인
async function onOpenList (openAlli) {
  dataList.value = []
  alliance.value = openAlli

  $loader.show()

  try {
    const result = await getOsirisRegList(openAlli)

    result.forEach((doc) => {
      dataList.value.push(doc.data())
    })

    $loader.hide()
  } catch (err) {
    console.log(err)
  }

  $loader.hide()

  await nextTick()

  isPopUpShow.value = true
}

// 팝업 닫기
function onClosePopUp () {
  dataList.value = []
  isPopUpShow.value = false
}
</script>

<template>
  <div>
    <HeaderTop title="Osiris Registration" />

    <q-page
      class="page-a-padding full-width column justify-center flex"
    >
      <div class="q-mt-md q-ml-md q-mb-xl">
        <span>등록까지 남은 시간: </span>
        <span class="regTimeTxt">{{ regTimeTxt }}</span>
      </div>

      <div
        class="col q-mt-xl"
        style="text-align: center"
      >
        <div class="col">
          <q-btn
            size="50px"
            round
            label="reg"
            color="white"
            class="r-btn r-ani-pulse"
            @click="onRegistration"
          />

          <div class="rd-container q-pr-md q-pl-md q-mt-xl">
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
                    >{{ rdCnt }}</a>
                  </td>
                  <td>
                    <a
                      href="#"
                      style="text-decoration: underline;"
                      @click="onOpenList('pd')"
                    >{{ pdCnt }}</a>
                  </td>
                  <td>
                    <a
                      href="#"
                      style="text-decoration: underline;"
                      @click="onOpenList('yd')"
                    >{{ ydCnt }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!--osiris 목록 팝업-->
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
  span.block
    font-size: 34px
    box-shadow: darkorange
    text-shadow: 0px 4px 9px rgb(0 0 0 / 30%)


.status-table .th-head
  font-size: 16px !important
  font-weight: bold
  color: #fff !important

.status-table.q-table
  box-shadow: 0px 4px 9px rgb(0 0 0 / 11%)

.status-table
  thead
    background: #ab0000
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

.regTimeTxt
  font-weight: 600
  color: #b90000
  font-size: 20px

.r-ani-pulse
  animation: pulse-red 2s infinite

</style>
