'use server';
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function NewListingPage() {
    const { user } = await getUser();

    if (!user) {
        return (
            <div className="container">
                <p>Please login to post a job</p>
            </div> 
        );
    }

    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    // Get list of user's companies from WorkOS
    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
    });

    const organizationNames: { [key: string]: string} = {};
    const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === "active");
    for (const activeMembership of activeOrganizationMemberships) {
        const org = await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationNames[org.id] = org.name;
    }

    return (
        <div className="container">
            <div>
                {/* <pre>{JSON.stringify(organizationMemberships, null, 2)}</pre> */}
                <h2 className="text-lg font-bold mt-6">Your Companies</h2>
                <p className="text-gray-500 my-2 text-sm">Select a company to post a job</p>
                {organizationMemberships.data.length === 0 && (
                    <div className="border border-gray-200 bg-gray-100 p-4 rounded-md">
                        No Company Found
                    </div>
                )}
                <div className="inline-block">
                {Object.keys(organizationNames).map(orgId => (
                    <Link href={'new-listing/' + orgId} className="border border-gray-300 mt-1 px-4 py-2 rounded-md block" key={orgId}>
                        {organizationNames[orgId]}
                    </Link>
                ))}
                </div>


                {/* Create a company */}
                <div>
                <Link 
                    href={"/new-company"} 
                    className="bg-gray-200 mt-4 px-4 py-2 rounded-md items-center inline-flex gap-2">
                        Create a company <FaArrowRight className="h-4"/>
                </Link>
                </div>

            </div>
        </div>
    );
}