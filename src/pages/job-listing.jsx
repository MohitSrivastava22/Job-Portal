import { getJobs } from '@/apiData/apiJobs';
import JobCard from '@/components/JobCard';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';



function JobListing() {
  const [searchQuery, setSearchQuery] = useState("")
    const [location, setLocation] = useState("")
    const [company_id, setCompany_id] = useState("")

  const { fn: fnJobs,
    data: jobs,
    loading: loadingJobs
  } = useFetch(getJobs, {location,company_id,searchQuery})
  console.log("Data job", jobs)


  const {isLoaded}=useUser()
  // console.log("isLoadedinitail", isLoaded);
  useEffect(() => {
    // console.log("isLoaded",isLoaded);
    
      if(isLoaded){        
        fnJobs()
      }
  }, [isLoaded,location,company_id,searchQuery])

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }


  return(
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h1>
      {/* add filter */}

      {loadingJobs &&
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      }
      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs?.length ?(
             jobs.map((job) => {
              // console.log(job);
              return <JobCard key={job.id} job={job} savedInit={job?.saved?.length>0} />
              
            })
          ):(
            <div>"No jobs available"</div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobListing;