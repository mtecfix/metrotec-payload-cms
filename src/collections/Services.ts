import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'status'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', options: [
      'managed-it', 'cybersecurity', 'cloud-services', 'voip', 
      'backup-recovery', 'it-consulting', 'network-support', 'help-desk'
    ]},
    { name: 'excerpt', type: 'textarea', maxLength: 300 },
    { name: 'content', type: 'richText' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'features', type: 'array', fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'icon', type: 'text', admin: { description: 'Bootstrap Icon class (e.g. bi-shield-check)' } },
    ]},
    { name: 'pricing', type: 'group', fields: [
      { name: 'startingAt', type: 'text', admin: { description: 'e.g. "$99/mo per user"' } },
      { name: 'ctaText', type: 'text', defaultValue: 'Get a Quote' },
      { name: 'ctaLink', type: 'text', defaultValue: '/get-quote.html' },
    ]},
    { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft', admin: { position: 'sidebar' } },
  ],
}
