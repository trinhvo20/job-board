import Job from "./Job";

export default function Jobs() {
    return (
        <div className="bg-slate-200 py-4 rounded-3xl">
            <div className="container">
                <h2 className="text-lg font-bold mb-4">Recent Jobs</h2>

                <div className="flex flex-col gap-4">
                    <Job />
                    <Job /> 
                    <Job /> 
                    <Job /> 
                </div>
            </div>
        </div>
    )
}