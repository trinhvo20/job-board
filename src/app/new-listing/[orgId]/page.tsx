import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import '@radix-ui/themes/styles.css';
import NewJobForm from "@/app/components/NewJobForm";


type Props = {
    params: {
        orgId: string
    }
}

export default async function NewListingPageForCompany(props: Props) {
    const { user } = await getUser();

    if (!user) {
        return (
            <div className="container">
                <p>Please login to post a job for this company</p>
            </div> 
        );
    }

    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const orgId = props.params.orgId;
    const oms = await workos.userManagement.listOrganizationMemberships({userId: user.id, organizationId: orgId});
    const hasAccess = oms.data.length > 0;
    if (!hasAccess) {
        return ('No Access')
    }

    return (
        <NewJobForm />
    )
}