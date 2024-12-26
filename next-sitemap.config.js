const fs = require('fs');
const path = require('path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.sealos.run',
  generateRobotsTxt: false, // 使用自定义的 robots.txt
  generateIndexSitemap: false, // 对于小型网站，不需要索引站点地图
  outDir: 'public',
  exclude: [
    '/server-sitemap.xml',
    '/api/*',
    '/zh/*', // 排除会被重定向的 zh 路径
    '/en/*', // 排除 en 路径
    '/docs/*', // 排除 docs 路径
    '*', // 排除所有其他路径
  ],
  additionalPaths: async (config) => {
    const result = [];

    // 添加博客首页
    result.push({
      loc: `${config.siteUrl}/blog`,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });

    // 从 content/blogs 目录读取博客文章
    const blogsDir = path.join(process.cwd(), 'content/blogs');
    const blogFolders = fs.readdirSync(blogsDir);

    // 为每个博客文章添加路径
    blogFolders.forEach((folder) => {
      result.push({
        loc: `${config.siteUrl}/blog/${folder}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },
} 