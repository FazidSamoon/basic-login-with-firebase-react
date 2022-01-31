import { useEffect, useState } from "react";
import { useAuth , upload } from "./Firebase"

export default function Profile(){

    const currentUser = useAuth();

    const [photo , setPhoto] = useState(null)

    const [loading , setLoading] = useState(false)

    const [photoURL , setPhotoURL] = useState("https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png")

    function handleChange(e){
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    function handleClick(){
        upload(photo , currentUser , setLoading)
    }

    useEffect(()=>{
        if (currentUser && currentUser.photoURL){
            setPhotoURL(currentUser.photoURL)
        }
        
    },[currentUser])


    return(
        <div>
            <input type="file" onChange={handleChange} />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <img alt="avatar" className="imgAvatar" src= {photoURL} />
        </div>
    )
}