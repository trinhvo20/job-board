import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { getUser } from '@workos-inc/authkit-nextjs';
import { enrichJobsWithOrgDetails, JobModel } from "@/models/Job";

export default async function Home() {
  const { user } = await getUser();
  
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
