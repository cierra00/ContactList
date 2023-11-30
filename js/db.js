// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, onSnapshot, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcayCxc0WoW1R70LwvlyeBJ6jBrbAr2pE",
  authDomain: "mobile-task-manager.firebaseapp.com",
  projectId: "mobile-task-manager",
  storageBucket: "mobile-task-manager.appspot.com",
  messagingSenderId: "954902763591",
  appId: "1:954902763591:web:fdf9d3adf643f01b057962"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getContacts(db) {
    const namesCol = collection(db, 'Contacts');
    const nameSnapshot = await getDocs(namesCol);
    const nameList = nameSnapshot.docs.map(doc => doc.data());
    return nameList;
  }

  /*const unSub = onSnapshot(collection(db, "Contacts"), (doc)=>{
    //console.log(doc.docChanges());
    doc.docChanges().forEach((change)=> {
        //console.log(change, change.doc.data(), change.doc.id);
        change.type ==="added"? renderContact(change.doc.data(), change.doc.id) : console.log("No changes")
    })
  })
*/

const unsub = onSnapshot(collection(db, "Contacts"), (doc) => {
    //   console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
      // console.log(change, change.doc.data(), change.doc.id);
      if (change.type === "added") {
        //Call render function in UI
        renderTask(change.doc.data(), change.doc.id);
      }
      if (change.type === "removed") {
        //do something
      }
    });
  });
  