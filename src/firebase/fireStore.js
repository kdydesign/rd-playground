import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getCountFromServer, setDoc, serverTimestamp, getDocs
} from 'firebase/firestore'
import firebaseApp from '@/firebase/index'
import moment from 'moment'

const db = getFirestore(firebaseApp)

// In-gamge 계정 정보 등록
export async function setUserInfo (userUID, userInfo) {
  try {
    const docRef = doc(db, 'rd-user-info', userUID)
    await setDoc(docRef, {
      ...userInfo,
      timestamp: moment(serverTimestamp()).format('YYYY-MM-DD'),
      level: 2
    })
  } catch (err) {
    console.log('[setUserInfo]: ', err)
  }
}

// In-game 계정 정보 조회
export async function getUserInfo (userUID) {
  try {
    const docRef = doc(db, 'rd-user-info', userUID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return void 0
    }
  } catch (err) {
    console.log('[getUserInfo]: ', err)
  }
}

// Osiris 참여 수
export async function getOsirisRegCnt (key) {
  try {
    const collectionRef = collection(db, `rd-reg-osiris/${key}/applicants-list`)
    const data = await getCountFromServer(collectionRef)

    return data.data().count
  } catch (err) {
    console.log('[getOsirisRegCnt]: ', err)
  }
}

// osiris 등록
export async function setRegOsiris (key, userUID, userInfo) {
  try {
    const docRef = doc(db, `rd-reg-osiris/${key}/applicants-list`, userUID)
    await setDoc(docRef, {
      ...userInfo,
      timestamp: moment(serverTimestamp()).format('YYYY-MM-DD')
    })
  } catch (err) {
    console.log('[setRegOsiris]: ', err)
  }
}

// Osiris 목록 조회
export async function getOsirisRegList (alliance) {
  try {
    const collectionRef = collection(db, `rd-reg-osiris/${alliance}/applicants-list`)

    return await getDocs(collectionRef)
  } catch (err) {
    console.log('[getOsirisRegList]: ', err)
  }
}