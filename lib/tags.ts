import { blog } from '@/lib/source';

export type TagInfo = {
  count: number;
};

export function getTagHref(tag: string) {
  return `/blog/tags/${encodeURIComponent(tag.toLowerCase())}`;
}

export function getTags() {
  const map = new Map<string, TagInfo>();

  for (const page of blog.getPages()) {
    if (!page.data.tags) continue;
    
    for (const tag of page.data.tags) {
      const normalizedTag = tag.toLowerCase();
      const record = map.get(normalizedTag);

      if (record) {
        record.count++;
      } else {
        map.set(normalizedTag, { count: 1 });
      }
    }
  }
  return map;
}
