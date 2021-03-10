import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAtPNZ8MsWUm-Z4FOKxdDWlW88xl3uxIro',
  authDomain: 'twitter-nextjs.firebaseapp.com',
  projectId: 'twitter-nextjs',
  storageBucket: 'twitter-nextjs.appspot.com',
  messagingSenderId: '658113558996',
  appId: '1:658113558996:web:a7b8ac0e40a4994e2bfe41'
}

!firebaseApp.apps.length && firebaseApp.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const mapUserFromFirebaseAuthToUser = user => {
  const {photoURL, email, displayName, uid} = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = onChange => {
  return firebaseApp.auth().onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

// Login con GitHub
export const loginWithGitHub = () => {
  const githubProvider = new firebaseApp.auth.GithubAuthProvider()
  return firebaseApp.auth().signInWithPopup(githubProvider)
}

// Añadir tweets
export const addTweet = ({avatar, content, img, userId, userName}) => {
  return db.collection('tweets').add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: new Date(),
    likesCount: 0,
    sharedCount: 0
  })
}

// Listar los tweets
export const fetchLatestTweets = () => {
  return db
    .collection('tweets')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({docs}) => {
      return docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        const {createdAt} = data

        return {...data, id, createdAt: +createdAt.toDate()}
      })
    })
}

// Subir imagenes
export const uploadImage = file => {
  const ref = firebaseApp.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  // Con esta tarea podemos ver la barra de progreso o hacer otras cosas
  return task
}
