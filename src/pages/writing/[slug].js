import hydrate from 'next-mdx-remote/hydrate'

import { getFiles, getFileBySlug } from 'lib/mdx'
import WritingLayout from 'layouts/WritingLayout'
import MDXComponents from 'components/MDXComponents'

export default function WritingSlug({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents
  })

  return <WritingLayout frontMatter={frontMatter}>{content}</WritingLayout>
}

export async function getStaticPaths() {
  const posts = await getFiles('writing')

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('writing', params.slug)

  return { props: post }
}