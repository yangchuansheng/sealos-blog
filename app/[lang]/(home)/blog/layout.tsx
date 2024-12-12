import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactNode } from 'react';
import styles from './blog.module.css';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: '博客 | Sealos - 专为云原生开发打造的以 K8s 为内核的云操作系统',
    description:
      'Sealos云操作系统,Kubernetes 云内核,多 Region 统一管理,以应用为中心的企业级容器云,秒级创建高可用数据库,自动伸缩杜绝资源浪费,一键创建容器集群,端到端的应用安全保障，支持多种复杂应用场景快速上云,超10w+企业,近百万开发者在线使用。',
    keywords:
      'Sealos,Docker,Kubernetes,云操作系统,云管理平台,云管理,容器云,企业级容器云,容器云部署,容器云厂商,云原生',
  };
}

export default async function BlogLayout({
  params,
  children,
}: {
  params: { lang: string };
  children: ReactNode;
}) {
  return (
    <div className={`h-full ${styles.blog_layout}`}>
      <Header lang={params.lang} />
      <div className="custom-container min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
