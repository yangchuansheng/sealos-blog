import { blog } from '@/lib/source';
import { Button } from '@/components/ui/button';
import { getTags } from '@/lib/tags';
import { domain } from '@/config/site';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogItem } from '@/app/[lang]/(home)/blog/page';

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const decodedTag = decodeURIComponent((await params).tag);
  const pages = blog
    .getPages()
    .filter((blog) =>
      blog.data.tags?.some((tag) => tag.toLowerCase() === decodedTag),
    );

  return (
    <main className="my-16 flex w-full flex-1 flex-col gap-5">
      <div className="mb-5 flex flex-col items-center gap-5 text-center">
        <h1 className="mb-4 text-3xl font-bold">{`标签「${decodedTag}」下的文章`}</h1>
        <Button asChild>
          <Link href="/blog/tags">所有标签</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <BlogItem key={page.url} page={page} />
        ))}
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const tags = [...getTags().keys()];

  return tags.map((key) => ({
    tag:
      process.env.NODE_ENV === 'production'
        ? key.toLowerCase()
        : encodeURIComponent(key.toLowerCase()),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  return {
    title: `标签「${decodedTag}」下的文章`,
    alternates: {
      canonical: `${domain}/blog/tags/${params.tag}`,
    },
    openGraph: {
      title: `标签「${decodedTag}」下的文章`,
    },
  };
}
