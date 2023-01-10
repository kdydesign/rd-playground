import { defineStore } from 'pinia'
import { ref } from 'vue'

export const loginStore = defineStore('login', () => {
  const userUID = ref(void 0)

  function userLogin () {
    console.log('call axios')
  }

  return { userUID, userLogin }
})
