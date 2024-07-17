'use client';
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import "react-country-state-city/dist/react-country-state-city.css";
import { FaUser, FaStar,FaPhoneAlt  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

export default function NewJobForm() {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);

    return (
        <Theme className="container">
            <h1 className="text-lg font-bold mt-6">Post a job</h1>
            <form 
                action=""
                className="mt-4 flex flex-col gap-4"
            >
                <TextField.Root placeholder="Job title" />

                <div className="flex">
                    <div className="w-1/3">
                        Remote?
                        <RadioGroup.Root defaultValue="onsite" name="example">
                            <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="hybrid">Hybrid-Remote</RadioGroup.Item>
                            <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>

                    <div>
                        Job Type
                        <RadioGroup.Root defaultValue="fulltime" name="example">
                            <RadioGroup.Item value="contact">Contact</RadioGroup.Item>
                            <RadioGroup.Item value="parttime">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="fulltime">Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                </div>

                <div>
                    Salary (per year)
                    <TextField.Root>
                        <TextField.Slot>
                            $
                        </TextField.Slot>
                    </TextField.Root>

                </div>

                <div>
                    Location
                    <div className="flex flex-col sm:flex-row gap-4 *:grow">
                        <CountrySelect 
                            placeholder="Select Country"
                            defaultValue={countryid ? {id: countryid} : 0}
                            onChange={(e:any) => setCountryid(e.id)}
                        />
                        <StateSelect 
                            placeholder="Select State" 
                            defaultValue={stateid ? {id: stateid} : 0}
                            countryid={countryid}
                            onChange={(e:any) => setStateid(e.id)}
                        />
                        <CitySelect 
                            placeholder="Select City" 
                            defaultValue={cityid ? {id: cityid} : 0}
                            stateid={stateid}
                            onChange={(e:any) => setCityid(e.id)}
                        />
                    </div>
                </div>

                <div className="flex">
                    <div className="w-1/3">
                        <h3>Job Logo</h3>
                        <div className="bg-gray-200 p-4 rounded-lg border-dotted size-24 inline-flex items-center content-center justify-center">
                            <FaStar className="text-gray-500 text-3xl"/>
                        </div>
                        <div className="mt-2"><Button variant="soft">Upload File</Button></div>
                    </div>
                    <div className="grow">
                        <h3>Contact Person</h3>
                        <div className="flex gap-2">
                            <div>
                                <div className="bg-gray-200 p-4 rounded-lg border-dotted size-24 inline-flex items-center content-center justify-center">
                                    <FaUser className="text-gray-500"/>
                                </div>
                                <div className="mt-2"><Button variant="soft">Upload File</Button></div>
                            </div>
                            <div className="grow flex flex-col gap-1">
                                <TextField.Root placeholder="Name" type="text">
                                    <TextField.Slot><IoMdPerson /></TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Phone" type="tel">
                                    <TextField.Slot><FaPhoneAlt /></TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Email" type="email">
                                    <TextField.Slot><MdEmail /></TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>
                </div>

                <TextArea placeholder="Job description" resize="vertical" />

                <Button size="3">Post Job</Button>
            </form>
        </Theme>
    )
}