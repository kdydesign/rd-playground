import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// import { getDatabase } from 'firebase/database'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBQaa5h6c3DQvBAu9NZmMUdC6yh0QPBgKE',
  authDomain: 'support-rd.firebaseapp.com',
  projectId: 'support-rd',
  storageBucket: 'support-rd.appspot.com',
  messagingSenderId: '861511696284',
  appId: '1:861511696284:web:a02c1fa5570bc61fdbd259',
  measurementId: 'G-69JKMQ4Y78'
})

// used for the databas refs
// const db = getDatabase(firebaseApp)

// here we can export reusable database references
// export const todosRef = dbRef(db, 'todos')
