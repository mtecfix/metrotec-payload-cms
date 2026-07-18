import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'DEFAULT_SECRET_CHANGE_ME',
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'role', type: 'select', options: ['admin', 'editor'], defaultValue: 'editor' },
      ],
    },
    {
      slug: 'pages',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true },
        { name: 'content', type: 'richText' },
        { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
      ],
    },
    {
      slug: 'services',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true },
        { name: 'category', type: 'select', options: ['managed-it', 'cybersecurity', 'cloud', 'voip', 'backup', 'consulting'] },
        { name: 'excerpt', type: 'textarea' },
        { name: 'content', type: 'richText' },
        { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
      ],
    },
    {
      slug: 'blog-posts',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'content', type: 'richText' },
        { name: 'category', type: 'select', options: ['cybersecurity', 'cloud', 'managed-it', 'backup', 'voip', 'compliance'] },
        { name: 'publishedDate', type: 'date' },
        { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
      ],
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        { name: 'alt', type: 'text', required: true },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
