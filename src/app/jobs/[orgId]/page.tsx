import Jobs from "@/app/components/Jobs";
import { enrichJobsWithOrgDetails, JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

type Props = {
    params: {
        orgId: string
    }
}

export default async function JobsForCompanyPage(props: Props) {
    // Get the company name from WorkOS
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    const {user} = await getUser();
    
    let jobs = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})));
    jobs = await enrichJobsWithOrgDetails(jobs, user);

    return (
        <div className="container">
            <h1 className="text-4xl my-6">{org.name}</h1>
            <Jobs header={"Jobs posted by " + org.name} jobs={jobs}/>
        </div>
    )
}