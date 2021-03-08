import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

export const loginWithGitHub = () => {
  const githubProvider = new firebaseApp.auth.GithubAuthProvider()
  return firebaseApp.auth().signInWithPopup(githubProvider)
}

export const addTweet = ({avatar, content, userId, userName}) => {
  return db.collection('tweets').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: new Date(),
    likesCount: 0,
    sharedCount: 0
  })
}

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
