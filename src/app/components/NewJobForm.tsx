'use client';
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import { FaUser, FaStar,FaPhoneAlt  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import { saveJobAction } from "../actions/jobActions";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { Job } from "@/models/Job";

export default function NewJobForm({orgId, jobDoc}: {orgId: string, jobDoc?: Job}) {
    const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
    const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
    const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
    const [countryName, setCountryName] = useState(jobDoc?.country || '');
    const [stateName, setStateName] = useState(jobDoc?.state || '');
    const [cityName, setCityName] = useState(jobDoc?.city || '');
    
    async function handleSaveJob(data: FormData) {
        data.set('country', countryName.toString());
        data.set('state', stateName.toString());
        data.set('city', cityName.toString());
        data.set('countryId', countryId.toString());
        data.set('stateId', stateId.toString());
        data.set('cityId', cityId.toString());
        data.set('orgId', orgId);
        
        const jobDoc = await saveJobAction(data);
        redirect(`/jobs/${jobDoc.orgId}`);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        console.log('1');
        if (!form.checkValidity()) {
            // If the form is invalid, trigger validation messages
            console.log('2');
            form.reportValidity();
            return;
        }
        const formData = new FormData(form);
        console.log('3');
        handleSaveJob(formData);
    }

    return (
        <Theme className="container">
            <h1 className="text-lg font-bold mt-6">Post a job</h1>
            <form 
                action={handleSaveJob}
                className="mt-4 flex flex-col gap-4"
            >
                {/* This line is crucial for differentiating between creating a new job and updating an existing job. 
                If 'jobDoc' is present, the form includes the job ID, signaling the backend to update the job. 
                If 'jobDoc' is absent, the form does not include an ID, indicating that a new job should be created. */}
                {jobDoc && (
                    <input type="hidden" name="id" value={jobDoc._id}/>
                )}

                {/* Title */}
                <TextField.Root name="title" placeholder="Job title" defaultValue={jobDoc?.title || ''} required/>

                <div className="grid md:grid-cols-3 gap-6 *:grow">
                    <div>
                        Remote?
                        <RadioGroup.Root defaultValue={jobDoc?.remote || 'On-site'} name="remote">
                            <RadioGroup.Item value="On-site">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="Hybrid">Hybrid Remote</RadioGroup.Item>
                            <RadioGroup.Item value="Remote">Fully Remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>

                    <div>
                        Job Type
                        <RadioGroup.Root defaultValue={jobDoc?.type || 'Full-time'} name="type">
                            <RadioGroup.Item value="Contact">Contact</RadioGroup.Item>
                            <RadioGroup.Item value="Part-time">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="Full-time">Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                </div>

                <div>
                    Salary (per year)
                    <TextField.Root name="salary" defaultValue={jobDoc?.salary || ''} required>
                        <TextField.Slot>
                            $
                        </TextField.Slot>
                    </TextField.Root>

                </div>

                <div>
                    Location
                    <div className="flex flex-col sm:flex-row gap-4 *:grow">
                        <CountrySelect
                            defaultValue={countryId ? {id:countryId,name:countryName} : 0}
                            onChange={(e:any) => {
                                setCountryId(e.id);
                                setCountryName(e.name);
                            }}
                            placeHolder="Select Country"
                            required
                        />
                        <StateSelect
                            defaultValue={stateId ? {id:stateId,name:stateName} : 0}
                            countryid={countryId}
                            onChange={(e:any) => {
                                setStateId(e.id);
                                setStateName(e.name);
                            }}
                            placeHolder="Select State"
                            required
                        />
                        <CitySelect
                            defaultValue={cityId ? {id:cityId,name:cityName} : 0}
                            countryid={countryId}
                            stateid={stateId}
                            onChange={(e:any) => {
                                setCityId(e.id);
                                setCityName(e.name);
                            }}
                            placeHolder="Select City"
                            required
                        />
                    </div>
                </div>

                <div className="sm:flex">
                    <div className="w-1/3">
                        <h3>Job Logo</h3>
                        <ImageUpload name="jobIcon" icon={FaStar} defaultValue={jobDoc?.jobIcon || ''}/>
                    </div>
                    <div className="grow">
                        <h3>Contact Person</h3>
                        <div className="flex gap-2">
                            <div>
                                <ImageUpload name="contactPhoto" icon={FaUser} defaultValue={jobDoc?.contactPhoto || ''}/>
                            </div>
                            <div className="grow flex flex-col gap-1">
                                <TextField.Root placeholder="Name" type="text" name="contactName" defaultValue={jobDoc?.contactName || ''} required>
                                    <TextField.Slot><IoMdPerson /></TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Phone" type="tel" name="contactPhone" defaultValue={jobDoc?.contactPhone || ''} required>
                                    <TextField.Slot><FaPhoneAlt /></TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Email" type="email" name="contactEmail" defaultValue={jobDoc?.contactEmail || ''} required>
                                    <TextField.Slot><MdEmail /></TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>
                </div>

                <TextArea placeholder="Job description" resize="vertical" name="description" defaultValue={jobDoc?.description || ''} required/>

                <Button size="3">Post Job</Button>
            </form>
        </Theme>
    )
}