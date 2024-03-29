import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import {app} from "../firebase"
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import {  useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    profilePicture:result.user.photoURL
                })
            })
            const data = await res.json()
            dispatch(signinSuccess(data))
            navigate('/')
            console.log(result)
        }catch{
           console.log('could not login with google',error)
        } 
    }
  return (
        <button type="button" onClick={handleGoogleClick} className="bg-red-700 rounded-lg p-2 uppercase text-white hover:opacity-95"> 
            Continue with google
     </button>
  )
}
