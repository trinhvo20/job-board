import { getUser } from "@workos-inc/authkit-nextjs";
import Jobs from "../components/Jobs";
import mongoose from "mongoose";
import { enrichJobsWithOrgDetails, JobModel } from "@/models/Job";

export default async function SearchPage({ searchParams  }: { searchParams : { q?: string } }) {
    const query = searchParams .q || '';
    const {user} = await getUser();
    await mongoose.connect(process.env.MONGODB_URI as string);

    const jobs = await JobModel.find({
        $or: [
            { title: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') }
        ]
    });
    
    const enrichedJobs = await enrichJobsWithOrgDetails(jobs, user);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-8">
                Search Results for "{query}"
            </h1>
            
            {enrichedJobs.length > 0 ? (
                <Jobs header="" jobs={enrichedJobs} />
            ) : (
                <p className="text-center text-gray-600">No jobs found for "{query}".</p>
            )}
        </div>
    );
}