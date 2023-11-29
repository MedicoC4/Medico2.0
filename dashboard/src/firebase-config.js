import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { doc,setDoc,getDoc,getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX4jPxFJQC5T1zDPzrKz3HRYQdeps2St4",
  authDomain: "medico-5add3.firebaseapp.com",
  projectId: "medico-5add3",
  storageBucket: "medico-5add3.appspot.com",
  messagingSenderId: "468442720217",
  appId: "1:468442720217:web:4346fe0419451e1fe39bc8",
  measurementId: "G-V475XKKJSM"
};

const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)


export const createPharmacyDocument = async (user, additionalData) => {
  if (!user) return;

  const pharmacyRef = doc(DB, `pharmacy/${user.uid}`);

  const snapshot = await getDoc(pharmacyRef);

  if (!snapshot.exists()) {
    const { email,number } = additionalData;

    if (email) {
      // Check if email is defined before setting it
      try {
        await setDoc(pharmacyRef, {
          email,
          number,
          logo:null,
          createdAt: new Date(),
          name:'Flen Pharmacy',
          distance:null,
          isVisited:false,
          isLocated:false,
          location:null,
          pharmacyLicense:null,
          productsId:null,
          type:null,
          verification:false,
          reviewId:null,
          qualifiedPharmacist:null
        });
      } catch (error) {
        console.log('Error in creating user', error);
      }
    } else {
      console.log('Email is missing or undefined.');
    }
  }
};