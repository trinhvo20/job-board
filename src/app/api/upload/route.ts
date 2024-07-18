import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    // Get file from request
    const file = (await request.formData()).get('file') as File;

    // Make connection to S3
    const s3Client = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY as string,
            secretAccessKey: process.env.S3_SECRET_KEY as string
        }
    });

    // Change name of file
    const newFileName = Date.now() + '-' + file.name;

    // Blob data to our file
    const chunks = [];
    // @ts-ignore
    for await (const chunk of file.stream()) {
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Upload file to S3
    await s3Client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET as string,
        Key: newFileName,
        Body: buffer,
        ACL: 'public-read',
        ContentType: file.type
    }));

    return Response.json({
        newFileName,
        url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${newFileName}`,
      });
}