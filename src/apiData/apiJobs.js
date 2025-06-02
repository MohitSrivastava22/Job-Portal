import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
    //The line const supabase = await supabaseClient(token); is used to create an authenticated Supabase client instance that can make requests on behalf of a specific user.
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select(`* ,saved:saved_jobs(id),company:companies(name,logo_url)`);

    if (location) {
        query = query.eq("location", location);
    }

    if (company_id) {
        query = query.eq("company_id", company_id)
    }

    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`)
    }

    const { data, error } = await query;
    if (error) {
        console.log("Error fetching Jobs:", error)
        return null
    }
    // console.log(data)
    return data;
}

export async function saveJobs(token, { alreadySaved }, saveData) {
    // const supabase=await supabaseClient(token)
    const supabase = await supabaseClient(token);
    if (alreadySaved) {
        const { data, error: deletedError } = await supabase.from("saved_jobs").delete().eq("job_id", saveData.job_id)

        if (deletedError) {
            console.error("Error in deleting the saved job", deletedError);
            return null;
        }
        return data
    } else {
        // By not specifying any columns in .select(), you are telling Supabase to return all columns for the newly inserted row(s).
        const { data, error: insertError } = await supabase.from("saved_jobs").insert([saveData]).select()
        // console.log(data);


        if (insertError) {
            console.error("Error in inserting the job", insertError)
            return null
        }
        return data
    }
}

export async function getSingleJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
    let query = supabase
        .from("jobs").select("*, company: companies(name,logo_url), applications: applications(*)").eq("id", job_id).single();

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching Job:", error);
        return null;
    }

    return data;
}


export async function updateHiringStatus(token, { job_id }, isOpen) {
    const supabase = await supabaseClient(token);
    let query = supabase
        .from("jobs").update({ isOpen }).eq("id", job_id).select();

    const { data, error } = await query;

    if (error) {
        console.error("Error Updating Hiring Status:", error);
        return null;
    }

    return data;
}

export async function addNewJob(token, _, jobData) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .insert([jobData])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Error Creating Job");
    }

    return data;
}



export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
        .from("saved_jobs")
        .select("*, job: jobs(*, company: companies(name,logo_url))");
    // console.log(data);

    if (error) {
        console.error("Error fetching Saved Jobs:", error);
        return null;
    }

    return data;
}



export async function deleteJob(token, { job_id }) {
    const supabase = await supabaseClient(token);

    const { data, error: deleteError } = await supabase
        .from("jobs")
        .delete()
        .eq("id", job_id)
        .select();

    if (deleteError) {
        console.error("Error deleting job:", deleteError);
        return data;
    }

    return data;
}



export async function getMyJobs(token, { recruiter_id }) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("jobs")
        .select("*, company: companies(name,logo_url)")
        .eq("recruiter_id", recruiter_id);

    if (error) {
        console.error("Error fetching Jobs:", error);
        return null;
    }

    return data;
}