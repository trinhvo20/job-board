import { JobModel } from "@/models/Job"
import mongoose from "mongoose"
import { getUser } from '@workos-inc/authkit-nextjs';
import { WorkOS } from "@workos-inc/node";
import { redirect } from "next/navigation";
import NewJobForm from "@/app/components/NewJobForm";
import "react-country-state-city/dist/react-country-state-city.css";

type Props = {
    params: {
        jobId: string
    }
}

export default async function EditJobPage(props: Props) {
    // Get the job ID from MongoDB
    const jobId = props.params.jobId
    await mongoose.connect(process.env.MONGODB_URI as string)
    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)))
    if (!jobDoc) {
        return ("Job not found")
    }

    // Get user
    const {user} = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) {
        return redirect('/login')
    }

    // Get user's organization memberships
    const oms = await workos.userManagement.listOrganizationMemberships({userId: user.id, organizationId: jobDoc.orgId});
    if (oms.data.length === 0) {
        return ("Access Denied")
    }

    return (
        <NewJobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
    )
}