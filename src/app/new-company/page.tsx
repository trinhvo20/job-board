import { createCompany} from "@/app/actions/workosActions";
import { getUser } from "@workos-inc/authkit-nextjs";

export default async function NewCompanyPage() {
    const { user } = await getUser();
    
    if (!user) {
        return (
            <div className="container">
                <p>Please login to create a company</p>
            </div> 
        );
    }
    async function handleCreateCompany(formData: FormData) {
        'use server';
        if (user) {
            await createCompany(formData.get('newCompanyName') as string, user.id);
        }
    }

    return (
        <div className="container">
            <h2 className="text-lg font-bold mt-6">Create a company</h2>
            <p className="text-gray-500 my-2 text-sm">You need to register a company to post a job</p>
            <form 
                className="flex gap-2"
                action={handleCreateCompany}>
                <input
                    name="newCompanyName"
                    className="border p-2 rounded-md border-gray-400"
                    placeholder="Company name"
                    type="text"/>

                <button type="submit" className="bg-gray-200 px-4 py-2 rounded-md items-center">
                    Create company
                </button>
            </form>
        </div>
    )
}