import { defineStore } from 'pinia'
import { ref } from 'vue'

export const loginStore = defineStore('login', () => {
  const userUID = ref(void 0)
  const name = ref(void 0)
  const power = ref(void 0)
  const uid = ref(void 0)
  const alliance = ref(void 0)
  const level = ref(void 0)

  function setUserUID (userUUID) {
    userUID.value = userUUID
  }

  function setUserInfo (userInfo, userKey) {
    userUID.value = userKey
    name.value = userInfo.name
    power.value = userInfo.power
    uid.value = userInfo.uid
    alliance.value = userInfo.alliance
    level.value = userInfo.level
  }

  return {
    userUID,
    name,
    power,
    uid,
    alliance,
    level,
    setUserInfo,
    setUserUID
  }
})
