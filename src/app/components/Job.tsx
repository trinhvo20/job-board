import { FaRegHeart } from "react-icons/fa";

export default function Job() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4 relative">
            <div className="absolute top-4 right-4 cursor-pointer">
                <FaRegHeart className="size-5 text-gray-500"/>
            </div>
            <div className="content-center">
                <img src="https://via.placeholder.com/150" className="size-12 rounded-full" />
            </div>
            <div className="grow sm:flex">
                <div className="grow">
                    <div className="font-bold">Job Title</div>
                    <div className="text-gray-600 text-sm mb-1">Company Name</div>
                    <div className="text-gray-500 text-xs">Location</div>
                </div>
                <div className="content-end text-gray-500 text-xs">
                    2 weeks ago
                </div>
            </div>
        </div>
    )
}