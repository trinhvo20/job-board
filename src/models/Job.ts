// DB
import { AutoPaginatable, OrganizationMembership, WorkOS, User } from '@workos-inc/node';
import mongoose, { Schema, models, model } from 'mongoose';

export type Job = {
  _id: string;
  title: string;
  description: string;
  orgName?: string;
  remote: string;
  type: string;
  salary: number;
  country: string;
  state: string;
  city: string;
  countryId: string;
  stateId: string;
  cityId: string;
  jobIcon: string;
  contactPhoto: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
};
  
const JobSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  remote: {type: String, required: true},
  type: {type: String, required: true},
  salary: {type: Number, required: true},
  country: {type: String, required: true},
  state: {type: String, required: true},
  city: {type: String, required: true},
  countryId: {type: String, required: true},
  stateId: {type: String, required: true},
  cityId: {type: String, required: true},
  jobIcon: {type: String},
  contactPhoto: {type: String},
  contactName: {type: String, required: true},
  contactPhone: {type: String, required: true},
  contactEmail: {type: String, required: true},
  orgId: {type: String, required: true},
  orgName: {type: String},
}, {
  timestamps: true,
});
  
export const JobModel = models?.Job || model('Job', JobSchema);


export async function enrichJobsWithOrgDetails(jobDocs: Job[], user: User|null) {
    jobDocs = JSON.parse(JSON.stringify(jobDocs));

    // await mongoose.connect(process.env.MONGODB_URI as string);
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    let orgMemberships: AutoPaginatable<OrganizationMembership>|null = null;
    
    // If a user is provided, retrieve their organization memberships
    if (user) {
        orgMemberships = await workos.userManagement.listOrganizationMemberships({userId: user?.id});
    }

    // Iterate over each job document
    for (const job of jobDocs) {
        // Retrieve organization details for the job's organization ID
        const org = await workos.organizations.getOrganization(job.orgId);

        // Add the organization name to the job document
        job.orgName = org.name;

        // If organization memberships are retrieved and not empty, check if user is an admin
        if (orgMemberships && orgMemberships.data.length > 0) {
            job.isAdmin = !!orgMemberships.data.find(om => om.organizationId === job.orgId);
        }
    }

    // Return the enriched job documents
    return jobDocs;
}


export async function enrichJobWithOrgDetails(job: any, user: User | null) {
    job = JSON.parse(JSON.stringify(job));
    
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    let orgMemberships = null;
    
    // If a user is provided, retrieve their organization memberships
    if (user) {
        orgMemberships = await workos.userManagement.listOrganizationMemberships({ userId: user.id });
    }

    // Retrieve organization details for the job's organization ID
    const org = await workos.organizations.getOrganization(job.orgId);

    // Add the organization name to the job document
    job.orgName = org.name;

    // If organization memberships are retrieved and not empty, check if user is an admin
    if (orgMemberships && orgMemberships.data.length > 0) {
        job.isAdmin = !!orgMemberships.data.find(om => om.organizationId === job.orgId);
    }

    // Return the enriched job document
    return job;
}