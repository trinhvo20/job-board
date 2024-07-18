// src/app/jobs/[jobId]/JobDetail.tsx

"use client";

import { Job } from "@/models/Job";
import { Button, Link } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

type JobDetailProps = {
    jobDoc: Job;
};

export default function JobDetail({ jobDoc }: JobDetailProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            await axios.delete(`/api/jobs?id=${jobDoc._id}`);
            router.push('/jobs'); // Navigate back to the jobs list page
        }
    };

    return (
        <div className="container mt-6">
            {/* Job Title and Details */}
            <div className="sm:flex">
                <div className="grow mt-4">
                    <h1 className="text-3xl">{jobDoc.title}</h1>
                    <div className="text-gray-600 font-bold mt-1">{jobDoc.orgName}</div>
                    <div className="text-blue-600 text-sm mt-1">
                        {jobDoc.remote} • {jobDoc.state}, {jobDoc.country} • {jobDoc.type}
                        {jobDoc.isAdmin && (
                            <span>
                                <span className="ml-12 text-green-500 cursor-pointer">
                                    <Link href={`/jobs/edit/${jobDoc._id}`} className="text-green-500">
                                        Edit
                                    </Link>
                                </span>
                                <span className="ml-3 text-red-500 cursor-pointer">
                                    <Button type="button" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </span>
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <img src={jobDoc.jobIcon} className="w-auto h-auto max-w-24 max-h-24" />
                </div>
            </div>

            {/* Job Description */}
            <div className="mt-6 text-gray-800 whitespace-pre-line text-sm">
                <p>{jobDoc.description}</p>
            </div>

            {/* Contact Person */}
            <div className="mt-6 bg-slate-100 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Apply by contacting us</h3>
                <div className="flex gap-4">
                    {jobDoc.contactPhoto === '' && (
                        <div className="bg-gray-200 p-4 rounded-lg border-dotted size-24 inline-flex items-center content-center justify-center">
                            <FaUser className="text-gray-500 text-2xl"/>
                        </div>
                    )}
                    {jobDoc.contactPhoto !== '' && (
                        <img 
                            src={jobDoc.contactPhoto} 
                            className="w-auto h-auto max-w-24 max-h-24"
                            alt="Contact Photo" />
                    )}
                    <div className="flex content-center items-center">
                        {jobDoc.contactName}<br />
                        Phone: {jobDoc.contactPhone}<br />
                        Email: {jobDoc.contactEmail}
                    </div>
                </div>
            </div>
        </div>
    );
}
