import Image from "next/image";
import { Link } from "@/i18n/routing";

export function ArticleCard({
  title,
  date,
  image,
  slug,
}: {
  title: string;
  date: string;
  image: string;
  slug: string;
}) {
  return (
    <Link
      href={`/articles/${slug}`}
      aria-label={title}
      className="flex cursor-pointer flex-col gap-2"
    >
      <div className="overflow-hidden rounded-md border border-white/10 shadow-md shadow-zinc-950/50 transition-colors duration-200 hover:border-white/20">
        <Image
          width={1536}
          height={256}
          alt={`${title} article image`}
          className="h-64 w-full object-cover transition-transform duration-200 hover:scale-105"
          src={image}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-xs text-muted">{date}</span>
      </div>
    </Link>
  );
}
