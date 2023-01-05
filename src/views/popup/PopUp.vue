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
const current = ref(1)
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

defineExpose({
  tttttttt
})

onMounted(() => {
})

watch(show, (value) => {
  isShow.value = value

  nextTick()
  console.log(tttttttt.value)
})
</script>

<template>
  <q-dialog
    v-model="isShow"
  >
    <q-layout
      view="Lhh lpR fff"
      container
      class="bg-white"
      style="max-height: 50vh"
    >
      <q-header
        reveal
        elevated
        class="bg-primary"
      >
        <q-toolbar>
          <q-toolbar-title>신청 현황</q-toolbar-title>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
          />
        </q-toolbar>
      </q-header>

      <q-page-container ref="tttttttt">
        <q-page
          padding
        >
          <div class="q-pa-xs">
            <div class="row">
              <div class="col">
                <q-select
                  v-model="type"
                  outlined
                  dense
                  :options="opts"
                  style="width: 80px"
                />
              </div>
            </div>

            <div class="q-mt-md">
              <q-table
                v-model:pagination="pagination"
                :virtual-scroll-sticky-size-start="48"
                :rows="dataList"
                :columns="columns"
                row-key="seq"
                virtual-scroll
                hide-bottom
                :rows-per-page-options="[0]"
                style="max-height: 34vh"
                class="my-sticky-virtscroll-table"
              />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
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
</style>
