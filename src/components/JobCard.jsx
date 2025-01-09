import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { saveJobs } from '@/apiData/apiJobs';

const JobCard = ({ 
    job, 
    savedInit=false,
    onJobAction=()=>{},
    isMyJob=false,
}) => {
    const [saved, setSaved] = useState(savedInit);
    const {user}=useUser();

  const { 
    fn: fnSavedJob,
    data: Savedjobs,
    loading: SavedJobloading
  } = useFetch(saveJobs, { alreadySaved:saved})


  const handleDeleteJob = async () => {
    // await fnSavedJob({
    //   user_id:user.id,
    //   job_id:job.id
    // },{alreadySaved:saved})
  }

  const handleSaveJob=async ()=>{
    setSaved(!saved)
    const response=await fnSavedJob({
      user_id:user.id,
      job_id: job.id
    })
    if(!response||response.length===0){
      setSaved(!saved);
    }
    onJobAction();
    
  }
  // console.log("saved job", Savedjobs);
  


  return (
    <Card className="flex flex-col">
          <CardHeader className="flex">
              <CardTitle className="flex justify-between font-bold">{job.title}
                {isMyJob && (
                    <Trash2Icon fill ="red" size={18} className='text-red-300 cursor-pointer' onClick={handleDeleteJob}/>
                )}
              </CardTitle>
          </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company_id && <img src={job.company_id.logo_url} alt='image' className='h-6'/>}
                <div className='flex gap-2 items-center'>
                    <MapPinIcon size={15}/>{job.location}
                </div>
            </div>
            <hr />
            {job.description.substring(0,job.description.indexOf("."))+"."}
          </CardContent>
          <CardFooter>
            <Link to={`/job/${job.id}`} className="flex-1">
            <Button variant="secondary" className="w-full">More Details</Button>
            </Link>
            {!isMyJob&& (
              <Button 
              variant="outline" 
              className="w-15" 
              onClick={handleSaveJob}
              disabled={SavedJobloading}>
                {saved ? (
              <Heart size={20} stroke="red" fill="red" />
                ):(
                <Heart size={20} stroke="red" fill="none" />
                )}
               
              </Button>
            )}
          </CardFooter>
    </Card>
  )
}

export default JobCard



// /* eslint-disable react/prop-types */
// import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
// import { Button } from "./ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Link } from "react-router-dom";
// import { saveJobs } from "@/apiData/apiJobs";
// import { useUser } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";
// import useFetch from "@/hooks/useFetch";

// const JobCard = ({
//   job,
//   savedInit = false,
//   onJobAction = () => { },
//   isMyJob = false,
// }) => {
//   const [saved, setSaved] = useState(savedInit);

//   const { user } = useUser();

 

//   const {
//     loading: loadingSavedJob,
//     data: savedJob,
//     fn: fnSavedJob,
//   } = useFetch(saveJobs);

//   const handleSaveJob = async () => {
//     await fnSavedJob({
//       user_id: user.id,
//       job_id: job.id,
//     });
//     onJobAction();
//   };

  

//   useEffect(() => {
//     if (savedJob !== undefined) setSaved(savedJob?.length > 0);
//   }, [savedJob]);

//   return (
//     <Card className="flex flex-col">
      
//       <CardHeader className="flex">
//         <CardTitle className="flex justify-between font-bold">
//           {job.title}
//           {isMyJob && (
//             <Trash2Icon
//               fill="red"
//               size={18}
//               className="text-red-300 cursor-pointer"
              
//             />
//           )}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4 flex-1">
//         <div className="flex justify-between">
//           {job.company && <img src={job.company.logo_url} className="h-6" />}
//           <div className="flex gap-2 items-center">
//             <MapPinIcon size={15} /> {job.location}
//           </div>
//         </div>
//         <hr />
//         {job.description.substring(0, job.description.indexOf("."))}.
//       </CardContent>
//       <CardFooter className="flex gap-2">
//         <Link to={`/job/${job.id}`} className="flex-1">
//           <Button variant="secondary" className="w-full">
//             More Details
//           </Button>
//         </Link>
//         {!isMyJob && (
//           <Button
//             variant="outline"
//             className="w-15"
//             onClick={handleSaveJob}
//             disabled={loadingSavedJob}
//           >
//             {saved ? (
//               <Heart size={20} fill="red" stroke="red" />
//             ) : (
//               <Heart size={20} />
//             )}
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default JobCard;