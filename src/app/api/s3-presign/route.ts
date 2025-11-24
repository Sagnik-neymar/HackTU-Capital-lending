import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req: Request) {
  try {
    const { fileName, fileType } = await req.json();

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const key = `uploads/${Date.now()}-${fileName}`;

    // 1️⃣ PRESIGNED URL FOR UPLOADING (PUT)
    const uploadUrl = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        ContentType: fileType,
      }),
      { expiresIn: 300 }
    );

    // 2️⃣ PRESIGNED URL FOR READING (GET)
    const signedGetUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
      }),
      { expiresIn: 300 } // backend can access for 5 mins
    );

    // 3️⃣ NON_SIGNED PUBLIC URL (NOT accessible unless public)
    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return Response.json({ uploadUrl, fileUrl, signedGetUrl, key });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Presign failed" }, { status: 500 });
  }
}
