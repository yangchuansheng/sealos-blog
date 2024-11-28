import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  i18n: false,
  disableThemeSwitch: true,
  nav: {
    title: (
      <div className="flex items-center gap-1">
        <Image alt="Sealos" src="/logo.svg" width={32} height={32} />
        <span className="hidden text-base font-bold md:block">Sealos</span>
      </div>
    ),
  },
  githubUrl: 'https://github.com/zjy365/sealos-site',
  links: [
    {
      text: '文档',
      url: '/docs',
      active: 'nested-url',
    },
  ],
};

export const HeaderLinks = [
  {
    text: '应用商店',
    url: 'https://template.hzh.sealos.run/',
  },
  {
    text: '文档',
    url: 'https://sealos.run/docs/5.0.0/Intro',
  },
  // {
  //   text: 'Pricing',
  //   url: '/pricing',
  // },
  {
    text: '博客',
    url: '/blog',
  },
  {
    text: '联系我们',
    url: 'https://fael3z0zfze.feishu.cn/share/base/form/shrcnesSfEK65JZaAf2W6Fwz6Ad',
  },
];
