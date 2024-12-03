'use client';

import dynamic from 'next/dynamic';
import { Suspense, memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// 动态导入 BlogCard 组件
const BlogCard = dynamic(() => import('./blog-card').then(mod => mod.BlogCard), {
  loading: () => (
    <div className="h-[400px] animate-pulse rounded-2xl bg-muted/60" />
  ),
  ssr: false, // 禁用服务端渲染以避免水合问题
});

interface BlogListProps {
  posts: Array<{
    url: string;
    data: {
      title: string;
      description: string;
      date: string;
      image?: string;
      authors: string[];
      tags?: string[];
    };
  }>;
}

function BlogListItem({ post }: { post: BlogListProps['posts'][0] }) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense
          fallback={
            <div className="h-[400px] animate-pulse rounded-2xl bg-muted/60" />
          }
        >
          <BlogCard page={post} />
        </Suspense>
      ) : (
        <div className="h-[400px] animate-pulse rounded-2xl bg-muted/60" />
      )}
    </div>
  );
}

const MemoizedBlogListItem = memo(BlogListItem);

function BlogListComponent({ posts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <MemoizedBlogListItem key={post.url} post={post} />
      ))}
    </div>
  );
}

export const BlogList = memo(BlogListComponent);
