import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";


export default function Signup() {
 const [formdata,setFormdata] = useState({})
 const [error,setError] = useState(false)
 const [errorMessage,setErrorMessage] = useState(null)
 const [successMessage,setSuccessMessage] = useState(null)
 const [empty,setEmpty] = useState(false) 
 const [loading,setLoading] = useState(false)
 const navigate = useNavigate()
const emptyField = () => {
  if (!formdata || !formdata.username || !formdata.email || !formdata.password ||  !formdata.username.trim) {
    return true
  }
}
 const handleChange = (e) => {
  setError(false)
  setEmpty(false)
  setErrorMessage(null)
  setSuccessMessage(null)
  setFormdata({...formdata, [e.target.id]:e.target.value})
  }
 const handleSubmit  = async (e) => {
  e.preventDefault();
  if(emptyField())
 {
  setEmpty(true)
  setError(true) 
  return false
 }
  try{
    setLoading(true)
    const res = await fetch('/api/auth/signup', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formdata)
    })    
    
    if (res.ok) {
      // Success
      const result = await res.json();
      setSuccessMessage(result.message)
      setTimeout(() => {
        navigate('/signin')
      }, 2500);
    } 
    else {
      const error = await res.json();
      setErrorMessage(error.message)
      setError(true)
  
    }
    setLoading(false)
  
  }
  catch(error){
   setError(true)
   setErrorMessage(error.message)
   setLoading(false)
  } 
 }
  return (
    <>
      <div className="max-w-lg mx-auto">
        <h3 className="text-3xl text-slate-800 font-bold text-center mt-10 mb-7">
          Sign Up
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="username"
            onChange={handleChange}
            id="username"
            className="bg-slate-200 p-2 rounded-lg"
          />
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
          <button disabled={loading} className="bg-slate-800 rounded-lg p-2 uppercase text-white hover:opacity-95">
            {loading ? 'Loading...' : 'SIGNUP'}
          </button>
          <OAuth/>
          <div className="flex gap-3">
            <p>Have an account?</p>
            <Link to="/Signin" className="text-blue-800 font-semibold">Sign In</Link>
          </div>
        </form>
        <p className="text-red-600 my-2">
          {empty ? 'Field cannot be empty' : error ? (errorMessage || 'Something went wrong') :""}
        </p>
        <p className="text-green-600 my-2">
         {successMessage ? successMessage:""}
       </p>
      </div>
    </>
  );
}
