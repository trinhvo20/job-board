import { Job } from "@/models/Job";
import JobRow from "./JobRow";

export default function Jobs({ header, jobs }: { header: string, jobs: Job[] }) {
    return (
        <div className="bg-slate-200 py-4 rounded-3xl">
            <div className="container">
                <h2 className="text-lg font-bold mb-4">{header || "Recent Jobs"}</h2>

                <div className="flex flex-col gap-4">
                    {!jobs && <div>No job found</div>}

                    {jobs && jobs.map((job) => (
                        <JobRow jobDoc={job}/>
                    ))}
                </div>
            </div>
        </div>
    )
}