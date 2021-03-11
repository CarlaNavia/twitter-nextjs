const admin = require('firebase-admin')

const serviceAccount = require('./firebase-keys.json')

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://twitter-nextjs.firebaseio.com'
  })
} catch (error) {
  console.log(error)
}

export const firestore = admin.firestore()
