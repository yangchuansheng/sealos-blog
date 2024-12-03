'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, memo } from 'react';
import { getTagHref } from '@/lib/tags';
import { blogAuthors } from '@/config/site';

interface BlogCardProps {
  page: {
    url: string;
    data: {
      title: string;
      description: string;
      date: string;
      image?: string;
      authors: string[];
      tags?: string[];
    };
  };
}

const BlogTag = memo(({ tag }: { tag: string }) => (
  <Link
    href={getTagHref(tag)}
    className="rounded-full bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground/90 transition-colors hover:bg-accent hover:text-accent-foreground"
  >
    {tag}
  </Link>
));
BlogTag.displayName = 'BlogTag';

const AuthorAvatar = memo(({ author }: { author: string }) => {
  const info = blogAuthors[author];
  if (!info?.image_url) return null;

  return (
    <Image
      key={author}
      src={info.image_url}
      alt={info.name}
      width={24}
      height={24}
      className="rounded-full border-2 border-background"
    />
  );
});
AuthorAvatar.displayName = 'AuthorAvatar';

function BlogCardComponent({ page }: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={page.url}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-b from-card/60 to-card/40 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-border/60 hover:shadow-lg dark:from-card/40 dark:to-card/30"
    >
      {page.data.image && (
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-2xl bg-muted/60">
          <Image
            src={page.data.image}
            alt={page.data.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            loading="lazy"
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC0zLyYuLy83PUBGRzpGNy4vRklJT1NXXW1eaGFoZGRvdXF1Xf/2wBDARUXFyAcIHw0kHyQvNzE3Xf/bAEMABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC0zLyYuLy83PUBGRzpGNy4vRklJT1NXXW1eaGFoZGRvdXF1Xf/AABEIACUAMgMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAAAwEEBQIG/8QAHxAAAgICAgMBAQAAAAAAAAAAAAECEQMhBBIxQVEi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDxiGY07RJhxvJJJf0Bvjxr2Ar4+Oo7l5JeRUqSLcA4nG7fmPwc8jhPtFr+jSxY6Vl04S4AAYvJ4n+o/wBKOTG4umevljUotGDzcLxu0vAFEAAH/9k="
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
        </div>
      )}
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <h2 className="line-clamp-2 text-xl font-semibold tracking-tight text-foreground/90 transition-colors group-hover:text-primary">
          {page.data.title}
        </h2>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground/80">
          {page.data.description}
        </p>
        {page.data.tags && page.data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {page.data.tags.map((tag) => (
              <BlogTag key={tag} tag={tag} />
            ))}
          </div>
        )}
        <div className="mt-2 flex items-center gap-3 border-t border-border/40 pt-4">
          <div className="flex -space-x-2">
            {page.data.authors.map((author) => (
              <AuthorAvatar key={author} author={author} />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
            <span className="font-medium">
              {page.data.authors.map(author => blogAuthors[author]?.name || author).join(', ')}
            </span>
            <span>·</span>
            <time dateTime={page.data.date} className="tabular-nums">
              {new Date(page.data.date).toLocaleDateString('zh-CN')}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const BlogCard = memo(BlogCardComponent);
