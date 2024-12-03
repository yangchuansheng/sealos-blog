import { blog } from '@/lib/source';
import { BlogList } from '../../components/blog-list';
import { domain } from '@/config/site';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { cache } from 'react';

const getTagPosts = cache((tag: string) => {
  return [...blog.getPages()]
    .filter((page) => page.data.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.data.date).getTime();
      const dateB = new Date(b.data.date).getTime();
      return dateB - dateA;
    })
    .map((post) => ({
      url: post.url,
      data: {
        title: post.data.title,
        description: post.data.description,
        date: typeof post.data.date === 'string' ? post.data.date : post.data.date.toISOString(),
        image: post.data.image,
        authors: post.data.authors,
        tags: post.data.tags || [],
      },
    }));
});

export default function TagPage({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = getTagPosts(decodedTag);

  return (
    <div className="container mx-auto px-4">
      <div className="py-16">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          标签：{decodedTag}
        </h1>
        <p className="text-center text-lg text-muted-foreground">
          共找到 {posts.length} 篇相关文章
        </p>
        <div className="mt-4 flex flex-row justify-center gap-2.5">
          <Button asChild>
            <Link href="/blog/tags" prefetch={true}>查看所有标签</Link>
          </Button>
        </div>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}

export function generateMetadata(props: {
  params: { tag: string };
}): Metadata {
  const decodedTag = decodeURIComponent(props.params.tag);

  return {
    title: `标签「${decodedTag}」下的文章`,
    alternates: {
      canonical: `${domain}/blog/tags/${props.params.tag}`,
    },
    openGraph: {
      title: `标签「${decodedTag}」下的文章`,
    },
  };
}

// 生成静态页面参数
export const dynamic = 'force-static';
export const revalidate = 3600; // 1小时重新验证一次
