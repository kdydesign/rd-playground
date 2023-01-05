<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import PopUp from '@/views/popup/PopUp.vue'
import HeaderTop from '@/components/Layouts/HeaderTop.vue'

const router = useRouter()

const isPopUpShow = ref(false)

function onRegistration() {
  router.push({ path: '/SelectOsiris' })
}

function onOpenList() {
  isPopUpShow.value = !isPopUpShow.value
}
</script>

<template>
  <div>
    <HeaderTop />

    <q-page class="page-a-padding full-width content-center justify-center flex">
      <div
        class="q-mx-auto column"
        style="width: 500px; text-align: center"
      >
        <div class="col">
          <q-btn
            size="80px"
            round
            label="REG"
            class="r-btn"
            @click="onRegistration"
          />

          <h2>10:22:33</h2>

          <div>
            <span class="float-left">지원현황</span>
            <table class="q-table">
              <colgroup>
                <col width="auto">
                <col width="auto">
                <col width="auto">
              </colgroup>

              <thead>
                <tr>
                  <th>RD</th>
                  <th>PD</th>
                  <th>YD</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <q-badge color="green">
                      <a
                        href="#"
                        @click="onOpenList"
                      >11</a>
                    </q-badge>
                  </td>
                  <td>
                    <q-badge color="green">
                      <a href="#">11</a>
                    </q-badge>
                  </td>
                  <td>
                    <q-badge color="green">
                      <a href="#">11</a>
                    </q-badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PopUp :show="isPopUpShow" />
    </q-page>
  </div>
</template>

<style lang="sass">
.r-btn
  border-radius: 130px
  background: linear-gradient(270deg, #ED0000 4.5%, #B10000 95.5%) !important

</style>
