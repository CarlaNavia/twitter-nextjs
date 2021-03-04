import firebase from "@firebase/app";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtPNZ8MsWUm-Z4FOKxdDWlW88xl3uxIro",
  authDomain: "twitter-nextjs.firebaseapp.com",
  projectId: "twitter-nextjs",
  storageBucket: "twitter-nextjs.appspot.com",
  messagingSenderId: "658113558996",
  appId: "1:658113558996:web:a7b8ac0e40a4994e2bfe41",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
};
