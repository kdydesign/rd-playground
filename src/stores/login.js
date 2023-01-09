import { defineStore } from 'pinia'

export const loginStore = defineStore('login', () => {
  function userLogin() {
    console.log('call axios')
  }

  return { userLogin }
})
