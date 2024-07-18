// src\app\page.tsx
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { getUser } from '@workos-inc/authkit-nextjs';
import { enrichJobsWithOrgDetails, JobModel } from "@/models/Job";
import mongoose from "mongoose";

export default async function Home() {
  const { user } = await getUser();
  await mongoose.connect(process.env.MONGODB_URI as string)
  
  const latestJobs = await enrichJobsWithOrgDetails(
    await JobModel.find({},{},{limit:5,sort:'-createdAt'}),
    user,
  );

  return (
    <>
      <Hero />
      <Jobs header="" jobs={latestJobs}/>
    </>
  );
}
