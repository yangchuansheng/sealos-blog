import { type AuthorData, blogAuthors } from '@/config/site';
import { blog } from '@/lib/source';
import { getTagHref } from '@/lib/tags';
import type { InferPageType } from 'fumadocs-core/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsPage } from 'fumadocs-ui/page';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

export default async function BlogLayout({
  params,
  children,
}: {
  params: { lang: string; slug: string };
  children: ReactNode;
}) {
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  return (
    <DocsLayout
      sidebar={{
        enabled: false,
      }}
      tree={blog.pageTree[params.lang]}
    >
      <DocsPage
        toc={page.data.toc}
        tableOfContent={{
          style: 'clerk',
          single: false,
          footer: (
            <div className="relative hidden rounded-lg border bg-custom-bg  text-card-foreground text-custom-primary-text shadow hover:bg-[#97D9FF] lg:block">
              <div className="flex flex-col space-y-1.5 p-6">
                <Image
                  alt="sidecard"
                  src="/images/sealos.webp"
                  width={200}
                  height={160}
                  className="w-full"
                />
              </div>
              <div className="p-6 pt-0">
                <p className="text-md font-bold">一键启动 开发未来</p>
                <p className="text-sm">
                  让环境配置、应用开发、部署发布一气呵成
                </p>
              </div>
              <div className="flex w-full items-center p-6 pt-0">
                <Link href="https://sealos.run/devbox" target="_blank" className="w-full">
                  <button className="inline-flex h-8 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-black px-3 text-xs font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    我要试试
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      className="size-3"
                    >
                      <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ),
        }}
      >
        <main
          className="mx-auto w-full max-w-[800px] py-10  sm:py-20"
          itemType="http://schema.org/Article"
          itemScope
        >
          <h1
            className="mb-2 text-3xl font-bold leading-normal"
            itemProp="name"
          >
            {page.data.title}
          </h1>
          <div className="mb-6 mt-3 flex flex-row flex-wrap items-center gap-1">
            <div className="flex flex-row flex-wrap gap-1">
              {page.data.authors.map((author, i) => (
                <Fragment key={i}>
                  {i !== 0 && <span className="mx-1">+</span>}
                  <SmallAuthor author={blogAuthors[author]} />
                </Fragment>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="mr-1">•</span>
              <span itemProp="datePublished">
                {new Date(page.data.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          {children}
          <Footer page={page} />
        </main>
      </DocsPage>
    </DocsLayout>
  );
}

function SmallAuthor({ author }: { author: AuthorData }) {
  return (
    <Link
      className="flex flex-row items-center gap-1.5 text-foreground"
      href={author.url ?? '#'}
      rel="nofollow noreferrer"
      target="_blank"
      itemProp="author"
    >
      {author.image_url != null && (
        <Image
          alt="avatar"
          src={author.image_url}
          width={25}
          height={25}
          className="h-full rounded-full"
        />
      )}
      {author.name}
    </Link>
  );
}

function Footer({ page }: { page: InferPageType<typeof blog> }) {
  return (
    <div className="mt-[5rem] flex flex-col gap-6">
      {page.data.tags && page.data.tags.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 text-base">
          <p>标签：</p>
          {page.data.tags.map((tag) => (
            <Link
              key={tag}
              href={getTagHref(tag)}
              className="rounded-md bg-primary/10 px-1 py-0.5 text-sm text-primary"
            >
              # {tag}
            </Link>
          ))}
        </div>
      )}
      {page.data.authors
        .map((author) => blogAuthors[author])
        .map((author, i) => (
          <Link
            key={i}
            className="flex flex-row gap-2 rounded-xl bg-card p-4 text-card-foreground"
            href={author.url ?? '#'}
            target="_blank"
            rel="nofollow noreferrer"
          >
            {author.image_url != null && (
              <Image
                itemProp="image"
                alt="avatar"
                src={author.image_url}
                width={40}
                height={40}
                className="h-full rounded-full"
              />
            )}
            <div>
              <p itemProp="name" className="font-medium">
                {author.name}
              </p>
              <p itemProp="jobTitle" className="text-sm text-muted-foreground">
                {author.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
