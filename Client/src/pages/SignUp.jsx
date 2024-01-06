import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
 const [formdata,setFormdata] = useState({})
 const [error,setError] = useState(false)
 const [empty,setEmpty] = useState(false)
 const [loading,setLoading] = useState(false)

const emptyField = () => {
  if (!formdata || !formdata.username || !formdata.email || !formdata.password ||  !formdata.username.trim) {
    return true
  }
}
 const handleChange = (e) => {
  setError(false)
  setEmpty(false)
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
    
    const data = await res.json();
    console.log(data)
    setLoading(false)
    if(data.success === false){
      setError(true)
    }
  }
  catch(error){
   console.error(error);
   setError(true)
   setLoading(false)
  } 
 }
  return (
    <>
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl text-blue-900 font-semibold text-center my-7">
          Sign Up
        </h2>
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
          <button disabled={loading} className="bg-slate-800 rounded-lg p-2 text-white">
            {loading ? 'Loading...' : 'SIGNUP'}
          </button>
          <div className="flex gap-3">
            <p>Have an account?</p>
            <Link to="/Signin" className="text-blue-800 font-semibold">Sign In</Link>
          </div>
        </form>
        <p className="text-red-600 my-2">
          {empty ? 'Field cannot be empty' : error && 'Something went wrong'}
        </p>
      </div>
    </>
  );
}
