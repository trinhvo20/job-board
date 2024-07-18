// This directive indicates that the code should run on the server side.
'use server';

import mongoose from "mongoose";
import {revalidatePath} from "next/cache";
import { JobModel } from "@/models/Job";

export async function saveJobAction(formData: FormData) {
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Convert the FormData object to a plain JavaScript object and destructure it.
    const {id, ...jobData} = Object.fromEntries(formData);
    
    // If an 'id' is present, find and update the job document with that ID; 
    // otherwise, create a new job document.
    const jobDoc = (id)
            ? await JobModel.findByIdAndUpdate(id, jobData)
            : await JobModel.create( jobData );
    
    // If 'orgId' is present in jobData, revalidate the path associated with 
    // that organization ID to refresh the cache.
    if ('orgId' in jobData) {
        revalidatePath('/jobs/' + jobData?.orgId);
    }

    // Return the saved job document after converting it to a plain JavaScript object.
    return JSON.parse( JSON.stringify(jobDoc) );
}