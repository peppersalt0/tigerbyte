import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  summary: string;
  image: string;
  slug: string;
}

export default function Card({ title, summary, image, slug }: CardProps) {
  return (
    <Link href={`/data-structures/${slug}`} className="block h-full">
      <div className="bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
        {/* Mobile: Only show title */}
        <div className="block sm:hidden p-4 h-full">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* Tablet & Desktop */}
        <div className="hidden sm:flex flex-col h-full p-4">
          <h3 className="text-lg font-semibold mb-3">{title}</h3>
          <div className="relative w-full flex-1 min-h-0"> {/* flex-1 to take remaining space */}
            <Image 
              src={image} 
              alt={`${title} visualization`} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="rounded-md object-cover"
              priority={title === "Arrays" || title === "Linked Lists"}
            />
          </div>
          <p className="text-sm text-gray-700 mt-3">{summary}</p>
        </div>
      </div>
    </Link>
  );
}