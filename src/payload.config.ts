import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { Services } from './collections/Services'
import { BlogPosts } from './collections/BlogPosts'
import { TeamMembers } from './collections/TeamMembers'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Testimonials } from './collections/Testimonials'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— MetroTec CMS',
    },
  },
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'role', type: 'select', options: ['admin', 'editor', 'viewer'], defaultValue: 'editor' },
      ],
    },
    Services,
    BlogPosts,
    TeamMembers,
    Pages,
    Media,
    Testimonials,
  ],
  plugins: [
    seoPlugin({
      collections: ['blog-posts', 'pages', 'services'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | MetroTec IT Solutions`,
      generateDescription: ({ doc }) => doc.excerpt || '',
    }),
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET || 'metrotec-www',
      config: {
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
  typescript: { outputFile: './src/payload-types.ts' },
})
