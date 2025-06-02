import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { deleteJob, saveJobs } from '@/apiData/apiJobs';

const JobCard = ({ 
    job, 
    savedInit=false,
    onJobAction=()=>{},
    isMyJob=false,
}) => {
    const [saved, setSaved] = useState(savedInit);
    const {user}=useUser();
  if (!job) return null;

  const { 
    fn: fnSavedJob,
    data: Savedjobs,
    loading: SavedJobloading
  } = useFetch(saveJobs, { alreadySaved:saved})

  
  const handleSaveJob=async ()=>{
    const response=await fnSavedJob({
      user_id:user.id,
      job_id: job.id
    })
    onJobAction(); 
  }

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  }

  useEffect(() => {
    if (Savedjobs !== undefined) setSaved(Savedjobs?.length > 0);
  }, [Savedjobs]);
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
          {job.company_id && <img src={job.company.logo_url} alt='image' className='h-6'/>}
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