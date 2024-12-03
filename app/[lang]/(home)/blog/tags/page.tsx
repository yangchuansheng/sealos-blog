import Link from 'next/link';
import { getTagHref, getTags, type TagInfo } from '@/lib/tags';
import { domain } from '@/config/site';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  alternates: {
    canonical: `${domain}/blog/tags`,
  },
};

export default function AllTags() {
  const tags: [string, TagInfo][] = [...getTags().entries()].sort(
    (a, b) => b[1].count - a[1].count,
  );

  return (
    <div className="container mx-auto px-4">
      <div className="py-16">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          所有标签
        </h1>
        <p className="text-center text-lg text-muted-foreground">
          共有 {tags.length} 个标签
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map(([tag, info]) => (
            <Link
              key={tag}
              href={getTagHref(tag)}
              className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {tag} ({info.count})
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
