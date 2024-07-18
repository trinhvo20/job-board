'use client';
import { Button } from "@radix-ui/themes";
import { ChangeEvent, useRef, useState } from "react";
import { IconType } from "react-icons";
import axios from "axios";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

export default function ImageUpload({name, icon:Icon, defaultValue=''}:{name:string, icon:IconType, defaultValue?:string}) {
    const fileInRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string>(defaultValue);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleUpload(e:ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement;
        if (input && input.files && input.files?.length > 0) {
            const file = input.files[0];
            setLoading(true);
            // TODO: Make API call to upload file to AWS S3
            const data = new FormData();
            data.set('file', file);
            const response = await axios.post('/api/upload', data);
            if (response.data.url) {
                setImage(response.data.url);
                setLoading(false);
            }
        }
    }
    return (
        <div>
            {/* Image Logo */}
            <div className="bg-gray-200 p-4 rounded-lg border-dotted size-24 inline-flex items-center content-center justify-center">
                {!image && !loading && <Icon className="text-gray-500 text-2xl"/>}
                {loading && <FaSpinner className="text-gray-500 animate-spin" />}
                {image && !loading && <img src={image} alt="Uploaded Image" className="w-auto h-auto max-w-24 max-h-24"/>}
            </div>
            
            {/* Save input that user inputs for the form */}
            <input type="hidden" name={name} value={image}/>

            {/* Upload File Button */}
            <div className="mt-2">
                <input 
                    type="file" 
                    ref={fileInRef} 
                    className="hidden"
                    onChange={e => handleUpload(e)}/>
                <Button 
                    variant="soft" 
                    type="button"
                    onClick={() => fileInRef.current?.click()}>
                    Upload File
                </Button>
            </div>
        </div>
    )
}