import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userSlice, { signinError, signinStart,signinClear, signinSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../component/OAuth";

export default function Signin(){
    const [formdata,setFormdata] = useState({})
    // const [loading,setLoading] = useState(false)
    // const [error,setError] = useState(false)
    const {loading, error, empty} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEmpty = () => {
     if(!formdata || !formdata.email || !formdata.password){
      return true
     } 
    }

    const handleSubmit = async (e) =>{ 
        e.preventDefault();
        if(isEmpty()){
          dispatch(signinError({message:"Field cannot be empty"}))
          return
        }
    try{    
        const res = await fetch('/api/auth/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formdata)
        })        
        const data = await res.json()
        if (res.ok) {
        if(data.success === false){
          dispatch(signinError(data))
          return
        }          
        dispatch(signinSuccess(data))
        navigate('/')
        }else{
          dispatch(signinError(data));
        }
    }
    catch(error){
     dispatch(signinError(error))
    } 
    }

    const handleChange =  (e) =>{
      // setEmpty(false)
      // setLoading(false)
      if (empty) {
        dispatch(signinClear())
      }
      setFormdata({...formdata, [e.target.id]:e.target.value})
    }

    return(
        <>
      <div className="max-w-lg mx-auto">
        <h3 className="text-3xl text-slate-800 font-bold text-center mt-10 mb-7">
          Sign In
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
          <input
            type="email"
            placeholder="email"
            onChange={handleChange}
            id="email"
            className="bg-slate-200 p-2 rounded-lg"
          />
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            id="password"
            className="bg-slate-200 shadow p-2 rounded-lg"
          />
          <button disabled={loading} className="bg-slate-800 rounded-lg p-2 text-white">
            {loading ? 'Loading...' : 'SIGNIN'}
          </button>
          <OAuth/>
          <div className="flex gap-3">
            <p>Dont Have an account?</p>
            <Link to="/Signup" className="text-blue-800 font-semibold">Sign up</Link>
          </div>
        </form>
        <p className="text-red-600 my-2">
          {/* {empty ? 'Field cannot be empty' :''} */}
          { error ? error.message || 'Something went wrong' : ""}
        </p>
      </div>
    </>
    )
}