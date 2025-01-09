import supabaseClient from "@/utils/supabase";

export async function getJobs(token,{location,company_id,searchQuery}){
    //The line const supabase = await supabaseClient(token); is used to create an authenticated Supabase client instance that can make requests on behalf of a specific user.
    const supabase=await supabaseClient(token);

    // let query=supabase.from("jobs").select("* , company:companies(name,logo_url), saved:saved_jobs(id)");
    // let query = supabase.from("jobs").select("*");
    const query = await supabase
        .from('jobs')
        .select(`
     *,
     companies (
       logo_url,
       name
     )
   `);

    if(location){
        query=query.eq("location",location);
    }

    if(company_id){
        query=query.eq("company_id",company_id)
    }

    if(searchQuery){
        query=query.ilike("title",`%${searchQuery}%`)
    }

    const {data,error}=await query;
    if(error){
        console.log("Error fetching Jobs:",error)
        return null
    }
    // console.log(data)
    return data;
}

export async function saveJobs(token,{alreadySaved},saveData){
    // const supabase=await supabaseClient(token)
    const supabase = await supabaseClient(token);
    if(alreadySaved){
        const {data,error:deletedError}=await supabase.from("saved_jobs").delete().eq("job_id",saveData.job_id)

        if (deletedError){
            console.error("Error in deleting the saved job", deletedError);
            return null;
        }
        return data
    }else{
        // By not specifying any columns in .select(), you are telling Supabase to return all columns for the newly inserted row(s).
        const {data,error:insertError}=await supabase.from("saved_jobs").insert([saveData]).select()

        if (insertError){
            console.error("Error in inserting the job", insertError)
            return null
        }
        return data
    }
}