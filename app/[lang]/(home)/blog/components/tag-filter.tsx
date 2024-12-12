'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getTags } from '@/lib/tags';
import { useCallback, useEffect, useState } from 'react';
import type { TagInfo } from '@/lib/tags';

export function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<Array<{ name: string; count: number }>>([]);
  const currentTag = searchParams.get('tag');

  useEffect(() => {
    const tagsMap = getTags();
    const sortedTags = Array.from(tagsMap.entries())
      .sort((a, b) => {
        const countA = (b[1] as TagInfo).count;
        const countB = (a[1] as TagInfo).count;
        return countA - countB;
      })
      .map(([name, info]) => ({
        name,
        count: (info as TagInfo).count
      }));
    setTags(sortedTags);
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value === '') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
      <Button
        variant={!currentTag ? 'default' : 'outline'}
        size="sm"
        onClick={() => {
          const query = createQueryString('tag', '');
          router.push(`/zh/blog${query ? `?${query}` : ''}`);
        }}
        className="rounded-full"
      >
        全部
      </Button>
      {tags.map(({ name, count }) => (
        <Button
          key={name}
          variant={currentTag === name ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            const query = createQueryString('tag', name);
            console.log(name,'tagtag',query)
            router.push(`/blog?${query}`);
          }}
          className={cn(
            'rounded-full',
            currentTag === name && 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {name} ({count})
        </Button>
      ))}
    </div>
  );
}
