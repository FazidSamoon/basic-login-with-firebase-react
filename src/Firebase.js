
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth , onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage , ref, uploadBytes} from "firebase/storage"
import { async } from "@firebase/util";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);


//signup user with the given emailand password
export function signUp(email , password){
    return createUserWithEmailAndPassword( auth , email , password);
    
}

//for the validation setting up user details in use state since then we can use them in reacy app
export function useAuth(){
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => { 
            setCurrentUser(user);
        })
        return unsub;
    },[])

    return currentUser;
}

//logout function 
export function logOut(){
    return signOut(auth);
}


export function login(email , password){
    return signInWithEmailAndPassword(auth, email, password)
}



//storage

export async function upload(file , currentUser , setLoading){
    const fileRef = ref(storage , currentUser.uid + '.png');

    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser , {photoURL: photoURL})

    setLoading(false);

    alert("uploaded the file")
}