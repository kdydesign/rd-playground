import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'


const auth = getAuth()

// fireAuth login
export async function getLogin (userId, userPassword) {
  try {
    const result = await signInWithEmailAndPassword(auth, userId, userPassword)

    return {
      result,
      status: 'ok'
    }
  } catch (err) {
    return {
      status: 'error',
      errors: {
        code: err.code,
        msg: err.message
      }
    }
  }
}

// fireAuth join auth
export async function getJoinAuth (userId, userPassword) {
  try {
    await createUserWithEmailAndPassword(auth, userId, userPassword)

    return {
      status: 'ok'
    }
  } catch (err) {
    return {
      status: 'error',
      errors: {
        code: err.code,
        msg: err.message
      }
    }
  }
}
