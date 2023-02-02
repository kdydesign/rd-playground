<script setup>
import { ref } from 'vue'

// components
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

// model
const type = ref(void 0)
const step = ref(1)
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

const pagination = { rowsPerPage: 0 }
const columns = [
  {
    name: 'index',
    label: 'seq',
    field: 'index'
  },
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left'
  },
  {
    name: 'power',
    field: 'power',
    label: 'Power',
    align: 'left'
  },
  {
    name: 'pos',
    field: 'pos',
    label: 'Position',
    align: 'left'
  },
]

const options = ['Top', 'Middle', 'Bottom']
const options2 = [
  {
    label: '집결',
    value: 1,
  },
  {
    label: '집결참여',
    value: 2,
  },
  {
    label: '집결참여/전초기지',
    value: 3,
  },
  {
    label: '관싸움',
    value: 4,
  },
]

let rows = ref([])

for (let i = 0; i < 100; i++) {
  rows.value.push({
    index: i,
    name: `test-${i}`,
    power: 1000000,
    pos: 'Top'
  })
}
const selected = ref([])
const filter = ref('')
const stepper = ref(void 0)

/**
 * Methods
 */

// alliance 변경
async function onChangeAlli (val) {
}

function onStep () {
  if (step.value === 4) {
    console.log('---')
  } else {
    stepper.value.next()
  }
}

</script>

<template>
  <div>
    <HeaderTop title="Osiris Settings" />

    <q-page
      class="page-a-padding full-width justify-center flex"
    >
      <div
        class="q-mx-auto q-pr-md q-pl-md q-mt-md"
        style="width: 100%"
      >
        <div class="q-mt-lg">
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

        <div class="q-mt-lg">
          <q-stepper
            ref="stepper"
            v-model="step"
            alternative-labels
            color="primary"
            animated
          >
            <q-step
              :name="1"
              title="Position"
              icon="settings"
              :done="step > 1"
            >
              <q-table
                v-model:selected="selected"
                class="my-sticky-dynamic"
                :rows="rows"
                :columns="columns"
                :loading="false"
                row-key="index"
                dense
                virtual-scroll
                hide-bottom
                :virtual-scroll-item-size="48"
                :virtual-scroll-sticky-size-start="48"
                :pagination="pagination"
                :rows-per-page-options="[0]"
                selection="multiple"
                :filter="filter"
              >
                <template #top>
                  <q-input
                    v-model="filter"
                    dense
                    debounce="300"
                    placeholder="Search"
                    style="width:100%"
                  >
                    <template #append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template #body="props">
                  <q-tr :props="props">
                    <q-td auto-width>
                      <q-checkbox
                        v-model="props.selected"
                        dense
                      />
                    </q-td>

                    <q-td
                      key="index"
                      :props="props"
                    >
                      {{ props.row.index }}
                    </q-td>

                    <q-td
                      key="name"
                      :props="props"
                    >
                      {{ props.row.name }}
                    </q-td>

                    <q-td
                      key="power"
                      :props="props"
                    >
                      {{ props.row.power }}
                    </q-td>

                    <q-td
                      key="pos"
                      :props="props"
                    >
                      <q-select
                        v-model="props.row.pos "
                        standout
                        dense
                        :options="options"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-step>

            <q-step
              :name="2"
              title="Captain"
              icon="create_new_folder"
              :done="step > 2"
            >
              <div>
                <div>
                  Top
                </div>

                <q-table
                  v-model:selected="selected"
                  class="my-sticky-dynamic"
                  :rows="rows"
                  :columns="columns"
                  :loading="false"
                  row-key="index"
                  dense
                  virtual-scroll
                  hide-bottom
                  :virtual-scroll-item-size="48"
                  :virtual-scroll-sticky-size-start="48"
                  :pagination="pagination"
                  :rows-per-page-options="[0]"
                  selection="single"
                  :filter="filter"
                  style="height:200px"
                />
              </div>

              <div>
                <div>
                  Middle
                </div>

                <q-table
                  v-model:selected="selected"
                  class="my-sticky-dynamic"
                  :rows="rows"
                  :columns="columns"
                  :loading="false"
                  row-key="index"
                  dense
                  virtual-scroll
                  hide-bottom
                  :virtual-scroll-item-size="48"
                  :virtual-scroll-sticky-size-start="48"
                  :pagination="pagination"
                  :rows-per-page-options="[0]"
                  selection="single"
                  :filter="filter"
                  style="height:200px"
                />
              </div>

              <div>
                <div>
                  Bottom
                </div>

                <q-table
                  v-model:selected="selected"
                  class="my-sticky-dynamic"
                  :rows="rows"
                  :columns="columns"
                  :loading="false"
                  row-key="index"
                  dense
                  virtual-scroll
                  hide-bottom
                  :virtual-scroll-item-size="48"
                  :virtual-scroll-sticky-size-start="48"
                  :pagination="pagination"
                  :rows-per-page-options="[0]"
                  selection="single"
                  :filter="filter"
                  style="height:200px"
                />
              </div>
            </q-step>

            <q-step
              :name="3"
              title="Telleport"
              icon="settings"
              :done="step > 3"
            >
              <div>
                <div>
                  Top
                </div>

                <q-table
                  v-model:selected="selected"
                  class="my-sticky-dynamic"
                  :rows="rows"
                  :columns="columns"
                  :loading="false"
                  row-key="index"
                  dense
                  virtual-scroll
                  hide-bottom
                  :virtual-scroll-item-size="48"
                  :virtual-scroll-sticky-size-start="48"
                  :pagination="pagination"
                  :rows-per-page-options="[0]"
                  selection="single"
                  :filter="filter"
                  style="height:200px"
                />
              </div>

              <div>
                <div>
                  Middle
                </div>

                <q-table
                  v-model:selected="selected"
                  class="my-sticky-dynamic"
                  :rows="rows"
                  :columns="columns"
                  :loading="false"
                  row-key="index"
                  dense
                  virtual-scroll
                  hide-bottom
                  :virtual-scroll-item-size="48"
                  :virtual-scroll-sticky-size-start="48"
                  :pagination="pagination"
                  :rows-per-page-options="[0]"
                  selection="single"
                  :filter="filter"
                  style="height:200px"
                />
              </div>

              <div>
                <div>
                  Bottom
                </div>

                <q-table
                  v-model:selected="selected"
                  class="my-sticky-dynamic"
                  :rows="rows"
                  :columns="columns"
                  :loading="false"
                  row-key="index"
                  dense
                  virtual-scroll
                  hide-bottom
                  :virtual-scroll-item-size="48"
                  :virtual-scroll-sticky-size-start="48"
                  :pagination="pagination"
                  :rows-per-page-options="[0]"
                  selection="single"
                  :filter="filter"
                  style="height:200px"
                />
              </div>
            </q-step>

            <q-step
              :name="4"
              title="Role"
              icon="create_new_folder"
              :done="step > 4"
              class="test-class"
            >
              <q-table
                class="my-sticky-dynamic"
                :rows="rows"
                :columns="columns"
                :loading="false"
                row-key="index"
                dense
                virtual-scroll
                hide-bottom
                :virtual-scroll-item-size="48"
                :virtual-scroll-sticky-size-start="48"
                :pagination="pagination"
                :rows-per-page-options="[0]"
                :filter="filter"
              >
                <template #top>
                  <q-input
                    v-model="filter"
                    dense
                    debounce="300"
                    placeholder="Search"
                    style="width:100%"
                  >
                    <template #append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template #body="props">
                  <q-tr :props="props">
                    <q-td
                      key="index"
                      :props="props"
                    >
                      {{ props.row.index }}
                    </q-td>

                    <q-td
                      key="name"
                      :props="props"
                    >
                      {{ props.row.name }}
                    </q-td>

                    <q-td
                      key="power"
                      :props="props"
                    >
                      {{ props.row.power }}
                    </q-td>

                    <q-td
                      key="pos"
                      :props="props"
                    >
                      <q-select
                        v-model="props.row.pos"
                        standout
                        dense
                        :options="options2"
                        map-options
                        emit-value
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-step>

            <template #navigation>
              <q-stepper-navigation>
                <q-btn
                  color="primary"
                  :label="step === 4 ? 'Finish' : 'Continue'"
                  @click="onStep"
                />
                <q-btn
                  v-if="step > 1"
                  flat
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                  @click="$refs.stepper.previous()"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </div>
      </div>
    </q-page>
  </div>
</template>

<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  height: 500px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1

  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  thead tr:first-child th
    top: 0


.q-stepper__header--alternative-labels
  .q-stepper__tab
    padding: 24px 0px !important
</style>
