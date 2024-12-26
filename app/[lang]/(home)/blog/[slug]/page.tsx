import { blogAuthors, domain, twitterHandle } from '@/config/site';
import { blog } from '@/lib/source';
import { DocsBody } from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import React from 'react';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = blog.getPage([(await params).slug]);
  if (!page) notFound();

  const Content = page.data.body;

  return (
    <DocsBody>
      <Content
        components={{
          ...defaultMdxComponents,
          img: (props) => (
            <ImageZoom {...(props as any)} className="rounded-xl" />
          ),
          p: ({ children, ...props }: any) => {
            const hasH5 = React.Children.toArray(children).some(
              (child) => React.isValidElement(child) && child.type === 'h5',
            );
            if (hasH5) {
              return <div {...props}>{children}</div>;
            }
            return <p {...props}>{children}</p>;
          },
        }}
      />
    </DocsBody>
  );
}

export function generateStaticParams() {
  return blog.generateParams().map((blog) => ({
    slug: blog.slug[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const imageUrl = page.data.image 
    ? `${domain}${page.data.image}`
    : `${domain}/opengraph-image.png`;

  const url = `${domain}/blog/${params.slug}`;

  return {
    metadataBase: new URL(domain),
    title: page.data.title,
    description: page.data.description,
    keywords: page.data.keywords,
    authors: page.data.authors.map((author) => ({
      name: blogAuthors[author].name,
      url: blogAuthors[author].url,
    })),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      tags: page.data.keywords,
      authors: page.data.authors.map((author) => blogAuthors[author].name),
      title: page.data.title,
      description: page.data.description,
      images: [imageUrl],
      publishedTime: page.data.date.toString(),
      modifiedTime: page.data.lastModified?.toString(),
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      title: page.data.title,
      description: page.data.description,
      images: [imageUrl],
    },
  } satisfies Metadata;
}
