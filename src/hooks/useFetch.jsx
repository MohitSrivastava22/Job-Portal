import { useSession } from '@clerk/clerk-react';
import {useState} from 'react'

const useFetch = (cb, options={})=>{ 
    const [data, setData] = useState(undefined)
    const [error, setError] = useState(null)
    const [loading,setLoading]=useState(null)
    const {session}=useSession();
    // The ...args syntax is a way of capturing all additional arguments passed to the function into a single array.This feature, known as the "rest parameter," is useful when the number of arguments is unknown or variable.
    const fn=async(...args)=>{
      setLoading(true);
      setError(null)
      try {
        // This line is using Clerk’s useSession hook to obtain a token from the user's session. This token is often referred to as a "Supabase access token" because it is configured specifically to work with Supabase authentication, allowing the user to securely interact with the Supabase API.
        const supabaseAccessToken=await session.getToken({
          template:"supabase"
        })
        const response=await cb(supabaseAccessToken,options,...args);
        setData(response)
        setError(null)
      } catch (error) {
        setError(error)
      }finally{
        setLoading(false)
      }
    }
    return {fn,data,loading,error};
}


export default useFetch
