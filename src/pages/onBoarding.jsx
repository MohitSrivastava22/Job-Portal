import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from "react-spinners";

function OnBoarding() {
  const {user,isLoaded}=useUser();
  const navigate=useNavigate();

  const handleRole=async(role)=>{
    await user.update({unsafeMetadata:{role}})
    .then(()=>{
      navigate(role === 'recruiter' ? ('/postJob') : ('/jobListing'))
    }).catch((err)=>{
      console.log("Error updating role:",err);
    })
  }

  useEffect(() => {
   if(user?.unsafeMetadata?.role){
    navigate(user?.unsafeMetadata?.role==='recruiter'?"/postJob":"/jobListing")
   }
  }, [user])

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }
  
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>I am a...</h2>
      <div className='mt-16 flex flex-col-2 justify-center gap-4 w-full md:px-40'>
        <Button variant="blue" className='h-28 w-40 text-2xl' onClick={()=>handleRole("candidate")}>Candidate</Button>
        <Button variant="destructive" className='h-28 w-40 text-2xl' onClick={() => handleRole("recruiter")}>Recruiter</Button>
      </div>
    </div>
  )
}

export default OnBoarding
