import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
    const { user } = await getUser();
    const signInUrl = await getSignInUrl();
    return (
        <header>
            <div className="flex justify-between items-center mx-auto my-4 container">
                <Link href="/" className="font-bold text-xl">Job Board</Link>
                <nav className="flex gap-2 *:py-2 *:px-4 *:rounded-md">
                    <Link href="/new-listing" className="bg-blue-600 text-white">
                        Post a job
                    </Link>
                    
                    {/* Login */}
                    {!user && <Link href={signInUrl} className="bg-gray-200">Login</Link>}
                    
                    {/* Logout */}
                    {user && <form 
                        className="bg-gray-200" 
                        action={async () => {
                            'use server';
                            await signOut();
                    }}>
                        <button type="submit">Logout</button>
                    </form>
                    }
                </nav>
            </div>
        </header>
    );
}