import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCZpsuXAZ0qqzGv1oTzMqclHLpkR6XgVFw",
    authDomain: "personal-todo-app-1.firebaseapp.com",
    projectId: "personal-todo-app-1",
    storageBucket: "personal-todo-app-1.appspot.com",
    messagingSenderId: "354298585914",
    appId: "1:354298585914:web:41fc8c68773a98186da603"
  };

//initiate App
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()

export {projectFirestore}


