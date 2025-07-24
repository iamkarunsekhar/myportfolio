import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.S3_BUCKET_NAME!
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];

export async function GET() {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 1000,
    })

    const listResponse = await s3Client.send(listCommand)
    
    if (!listResponse.Contents) {
      return Response.json({ images: [] })
    }

    const imagePromises = listResponse.Contents
      .filter(object => {
        const key = object.Key?.toLowerCase() || ''
        return IMAGE_EXTENSIONS.some(ext => key.endsWith(ext))
      })
      .map(async (object) => {
        const getObjectCommand = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: object.Key!,
        })

        const presignedUrl = await getSignedUrl(s3Client, getObjectCommand, {
          expiresIn: 3600,
        })

        return {
          key: object.Key!,
          url: presignedUrl,
          lastModified: object.LastModified,
          size: object.Size,
        }
      })

    const images = await Promise.all(imagePromises)

    return Response.json({ images })
  } catch (error) {
    console.error('Error fetching images:', error)
    return Response.json({ message: 'Error fetching images' }, { status: 500 })
  }
}
