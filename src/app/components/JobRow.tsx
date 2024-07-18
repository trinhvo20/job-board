'use client';
import '@radix-ui/themes/styles.css';
import { JobModel, type Job } from "@/models/Job";
import { FaRegHeart } from "react-icons/fa";
import TimeAgo from './TimeAgo';
import { Button, Link } from "@radix-ui/themes";
import axios from 'axios';

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 relative">
            <div className="absolute top-4 right-4 cursor-pointer">
                <FaRegHeart className="size-5 text-gray-500"/>
            </div>
            <div className="content-center">
                <img src={jobDoc?.jobIcon} className="size-12 rounded-full" />
            </div>
            <div className="grow sm:flex">
                <div className="grow">
                    <div className="font-bold">{jobDoc.title}</div>
                    <div className="text-gray-600 text-sm mb-1">{jobDoc.orgName}</div>
                    <div className="text-gray-500 text-xs">
                        {jobDoc.remote} • {jobDoc.state}, {jobDoc.country} • {jobDoc.type}
                        {jobDoc.isAdmin && (
                            <span>
                                <span className='ml-4 text-green-500 cursor-pointer'>
                                    <Link href={`/jobs/edit/${jobDoc._id}`} className="text-green-500">Edit</Link>
                                </span>
                                <span className='ml-2 text-red-500 cursor-pointer'>
                                    <Button 
                                        type='button'
                                        onClick={async () => {
                                            if (window.confirm('Are you sure you want to delete this job?')) {
                                                await axios.delete('/api/jobs?id=' + jobDoc._id);
                                                window.location.reload();
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </span>
                            </span>
                        )}
                    </div>
                </div>
                {jobDoc.createdAt && (
                    <div className="content-end text-gray-500 text-xs">
                        <TimeAgo createdAt={jobDoc.createdAt} />
                    </div>
                )}
            </div>
        </div>
    )
}