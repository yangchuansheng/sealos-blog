'use client'

import type { Metadata } from 'next';
import { BlogList } from './components/blog-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { blog } from '@/lib/source';
import { useMemo } from 'react';
import { TagFilter } from './components/tag-filter';
import { useParams, useSearchParams } from 'next/navigation';

// 使用 React cache 缓存博客数据
const getBlogPosts = ((tag?: string) => {
  let posts = [...blog.getPages()]
    .sort((a, b) => {
      const dateA = new Date(a.data.date).getTime();
      const dateB = new Date(b.data.date).getTime();
      return dateB - dateA;
    });

  if (tag) {
    posts = posts.filter((post) => 
      post.data.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  return posts.map(post => ({
    url: post.url,
    data: {
      title: post.data.title,
      description: post.data.description,
      date: typeof post.data.date === 'string' ? post.data.date : post.data.date.toISOString(),
      image: post.data.image,
      authors: post.data.authors,
      tags: post.data.tags || [],
    }
  }));
});

export default  function BlogIndex() {

  const searchParams = useSearchParams()
  const tag = searchParams.get('tag') as string
  const posts = useMemo(() => getBlogPosts(tag), [tag]);

  return (
    <div className="container mx-auto px-4">
      <div className="py-16">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          博客
        </h1>
        <div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
          <p className="text-center text-lg text-muted-foreground">
            分享与 Sealos 相关的技术见解、产品动态与行业洞察
          </p>
        </div>
        <div className="mt-4 flex flex-row justify-center gap-2.5">
          <Button asChild>
            <Link href="/blog/tags" prefetch={true}>查看所有标签</Link>
          </Button>
        </div>
      </div>

      <TagFilter />
      <BlogList posts={posts} />
    </div>
  );
}

// // 生成静态页面参数
// export const dynamic = 'force-static';
// export const revalidate = 3600; // 1小时重新验证一次
