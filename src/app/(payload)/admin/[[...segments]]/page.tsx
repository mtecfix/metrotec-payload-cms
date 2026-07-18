/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'

type Args = { params: Promise<{ segments: string[] }>; searchParams: Promise<{ [key: string]: string | string[] }> }

const Page = ({ params, searchParams }: Args) => RootPage({ config, params, searchParams })
export default Page
