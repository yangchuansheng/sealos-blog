import type { Metadata } from 'next';
import { BlogList } from './components/blog-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { blog } from '@/lib/source';
import { cache } from 'react';

export function generateMetadata(): Metadata {
  return {
    title: '博客 | Sealos - 专为云原生开发打造的以 K8s 为内核的云操作系统',
    description:
      'Sealos云操作系统,Kubernetes 云内核,多 Region 统一管理,以应用为中心的企业级容器云,秒级创建高可用数据库,自动伸缩杜绝资源浪费,一键创建容器集群,端到端的应用安全保障，支持多种复杂应用场景快速上云,超10w+企业,近百万开发者在线使用。',
    keywords:
      'Sealos,Docker,Kubernetes,云操作系统,云管理平台,云管理,容器云,企业级容器云,容器云部署,容器云厂商,云原生',
  };
}

// 使用 React cache 缓存博客数据
const getBlogPosts = cache(() => {
  return [...blog.getPages()]
    .sort((a, b) => {
      const dateA = new Date(a.data.date).getTime();
      const dateB = new Date(b.data.date).getTime();
      return dateB - dateA;
    })
    .map(post => ({
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

export default function BlogIndex() {
  const posts = getBlogPosts();

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
      <BlogList posts={posts} />
    </div>
  );
}

// 生成静态页面参数
export const dynamic = 'force-static';
export const revalidate = 3600; // 1小时重新验证一次
