// import { JobModel } from "@/models/Job"
// import { Button, Link } from "@radix-ui/themes"
// import axios from "axios"
// import mongoose from "mongoose"

// type Props = {
//     params: {
//         jobId: string
//     }
// }
// export default async function SingleJobPage(props: Props) {
//     const jobId = props.params.jobId
//     await mongoose.connect(process.env.MONGODB_URI as string)
//     const jobDoc = await JobModel.findById(jobId)

//     return (
//         <div className="container mt-6">
//             <div className="sm:flex">
//                 <div className="grow mt-4">
//                     <h1 className="text-3xl">{jobDoc.title}</h1>
                    
//                     <div className="text-blue-600 text-sm mt-2">
//                         {jobDoc.remote} • {jobDoc.state}, {jobDoc.country} • {jobDoc.type}
//                         {jobDoc.isAdmin && (
//                             <span>
//                                 <span className='ml-4 text-green-500 cursor-pointer'>
//                                     <Link href={`/jobs/edit/${jobDoc._id}`} className="text-green-500">Edit</Link>
//                                 </span>
//                                 <span className='ml-2 text-red-500 cursor-pointer'>
//                                     <Button 
//                                         type='button'
//                                         onClick={async () => {
//                                             if (window.confirm('Are you sure you want to delete this job?')) {
//                                                 await axios.delete('/api/jobs?id=' + jobDoc._id);
//                                                 window.location.reload();
//                                             }
//                                         }}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </span>
//                             </span>
//                         )}
//                     </div>
//                 </div>

//                 <div>
//                     <img src={jobDoc.jobIcon} className="w-auto h-auto max-w-24 max-h-24" />
//                 </div>
//             </div>

//             <div className="my-2 text-gray-800 whitespace-pre-line text-sm">
//                 <p>{jobDoc.description}</p>
//             </div>
//         </div>
//     )
// }   

// src/app/jobs/[jobId]/page.tsx

import mongoose from "mongoose";
import { getUser } from "@workos-inc/authkit-nextjs";
import { enrichJobWithOrgDetails, JobModel } from "@/models/Job";
import JobDetail from "@/app/jobs/show/[jobId]/JobDetail";

type Props = {
    params: {
        jobId: string;
    };
};

export default async function SingleJobPage(props: Props) {
    const jobId = props.params.jobId;
    const { user } = await getUser();
    await mongoose.connect(process.env.MONGODB_URI as string);

    const jobDoc = await enrichJobWithOrgDetails(await JobModel.findById(jobId), user);

    return (
        <div>
            <JobDetail jobDoc={jobDoc} />
        </div>
    );
}
