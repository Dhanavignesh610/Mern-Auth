import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin(){
    const [loading,setLoading] = useState(false)
    const handleSubmit = (e) =>{
        console.log(e);
    }
    const handleChange =  (e) =>{
        console.log(e);
    }
    return(
        <>
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl text-blue-900 font-semibold text-center my-7">
          Sign In
        </h2>
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
          <div className="flex gap-3">
            <p>Dont Have an account?</p>
            <Link to="/Signup" className="text-blue-800 font-semibold">Sign up</Link>
          </div>
        </form>
        <p className="text-red-600 my-2">
          {/* {empty ? 'Field cannot be empty' : error && 'Something went wrong'} */}
        </p>
      </div>
    </>
    )
}