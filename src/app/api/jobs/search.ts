// src/app/api/jobs/search.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { JobModel } from '@/models/Job';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';

    await mongoose.connect(process.env.MONGODB_URI as string);

    const jobs = await JobModel.find({
        $or: [
            { title: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') }
        ]
    });

    return NextResponse.json(jobs);
}
