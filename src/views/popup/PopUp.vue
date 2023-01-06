<script setup>
import { toRefs, defineProps, ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const { show } = toRefs(props)
const isShow = ref(false)
const type = ref('RD')
const tableHeight = ref(void 0)
const tttttttt = ref(null)
const pagination = ref({
  rowsPerPage: 0
})
const opts = ref(['RD', 'PD', 'YD'])

const columns = [
  { name: 'seq', label: 'No.', field: 'seq', align: 'center' },
  { name: 'name', label: 'Name', field: 'name', align: 'center' },
  { name: 'power', label: 'Power', field: 'power', align: 'center' }
]

let dataList = []

for (let i of Array(100)
  .fill(0)
  .map((a, i) => a + (i + 1))) {
  dataList.push({ seq: i, name: `Test - ${i}`, power: i * 10000000 })
}

function onResize (size) {
  tableHeight.value = size.height - 140
}

watch(show, (value) => {
  isShow.value = value
})
</script>

<template>
  <q-dialog
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
            신청 목록
          </q-item-label>
        </q-item-section>
        <q-btn
          v-close-popup
          dense
          flat
          icon="close"
          class="float-right"
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
            style="width: 80px"
          />
        </div>

        <div class="col">
          <q-table
            v-model:pagination="pagination"
            :virtual-scroll-sticky-size-start="48"
            :rows="dataList"
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
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0


.title-back
  color: #fff
  background: linear-gradient(270deg, #ED0000 4.5%, #B10000 95.5%) !important
</style>
