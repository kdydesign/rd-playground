<script setup>
import { toRefs, defineProps, ref, watch, computed, defineEmits, inject } from 'vue'
import { getOsirisRegList } from '@/firebase/fireStore'

// inject global component
const $loader = inject('$loader')

// props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  dataList: {
    type: Array,
    default: () => []
  },
  alliance: {
    type: String,
    default: 'rd'
  }
})

// event emits
const emits = defineEmits(['close'])

// model
const { show } = toRefs(props)
const localDataList = ref(props.dataList)
const isShow = ref(false)
const type = ref(void 0)
const tableHeight = ref(void 0)
const pagination = ref({
  rowsPerPage: 0
})
const opts = ref([
  {
    label: 'RD',
    value: 'rd',
  },
  {
    label: 'PD',
    value: 'pd',
  },
  {
    label: 'YD',
    value: 'yd',
  },
])
const columns = [
  { name: 'seq', label: 'No.', field: 'seq', align: 'center' },
  { name: 'name', label: 'Name', field: 'name', align: 'center' },
  { name: 'power', label: 'Power', field: 'power', align: 'center' }
]

/**
 * computed
 */

// 지원 목록 조회
const getDataList = computed(() => {
  return localDataList.value
})

function onResize (size) {
  tableHeight.value = size.height - 140
}

function onClosePopUp () {
  emits('close')
}

// alliance 변경
async function onChangeAlli (val) {
  $loader.show()

  localDataList.value = []

  try {
    const result = await getOsirisRegList(val.toLowerCase())

    result.forEach((doc) => {
      localDataList.value.push(doc.data())
    })

    $loader.hide()
  } catch (err) {
    console.log(err)
  }
}

/**
 * watch
 */

watch(show, (value) => {
  localDataList.value = props.dataList
  type.value = props.alliance
  isShow.value = value
})
</script>

<template>
  <q-dialog
    ref="test"
    v-model="isShow"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-resize-observer @resize="onResize" />

    <q-card>
      <q-item class="title-back">
        <q-item-section>
          <q-item-label style="font-weight: bold">
            {{ type.toUpperCase() }} 신청 목록
          </q-item-label>
        </q-item-section>
        <q-btn
          v-close-popup
          dense
          flat
          icon="close"
          class="float-right"
          @click="onClosePopUp"
        />
      </q-item>

      <q-separator />

      <q-card-section class="column">
        <div class="col">
          <q-select
            v-model="type"
            outlined
            dense
            :options="opts"
            map-options
            emit-value
            style="width: 80px"
            @update:model-value="onChangeAlli"
          />
        </div>

        <div class="col">
          <q-table
            v-model:pagination="pagination"
            :virtual-scroll-sticky-size-start="48"
            :rows="getDataList"
            :columns="columns"
            row-key="seq"
            virtual-scroll
            hide-bottom
            :rows-per-page-options="[0]"
            class="my-sticky-virtscroll-table q-mt-md"
            :style="`height:${tableHeight}px`"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="sass">
.my-sticky-virtscroll-table
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff


  thead tr th
    position: sticky
    z-index: 1

  thead tr:last-child th
    top: 48px

  thead tr:first-child th
    top: 0

.title-back
  color: #fff
  background: linear-gradient(270deg, #ED0000 4.5%, #B10000 95.5%) !important
</style>
