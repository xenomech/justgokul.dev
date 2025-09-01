import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { CountPrimitive } from '../count';
import { ImageGroup } from '../image-group';

type PropType = {
    title: string;
    slug: string;
    views?: number;
    readingTime?: string;
    date?: string;
    type?: 'blog' | 'snippets' | 'twitter' | 'photography';
    excerpt?: string;
    lookupImages: string[]
};

export default function GridCard({
    title,
    slug,
    readingTime,
    type,
    date,
    lookupImages,
}: PropType) {
    return (
        <div className=" w-full px-2 py-4">
            <div className="flex flex-col w-full items-center justify-center gap-3">
                <ImageGroup 
                    images={
                        lookupImages.map((item, index) => {
                            return {
                                src: item,
                                alt: `${title} - Image ${index + 1}`,
                                height: 100,
                                width: 100
                            }
                        })
                    }
                />
                <Link href={`${type}/${slug}`} className='flex items-center justify-center w-full gap-10'>
                    <div>
                        <p className="max-w-xs text-lg font-semibold md:max-w-lg">{title}</p>
                        <div className="flex flex-col items-start justify-between gap-2 text-sm opacity-60 md:flex-row md:items-center">
                            {date && <span>Posted {date}</span>}
                            {date && readingTime && <span className="hidden md:flex"> • </span>}
                            {readingTime && <span>{readingTime}</span>}
                            {type !== 'twitter' && (
                                <span className="hidden gap-2 md:flex">
                                    <span> • </span>
                                    <CountPrimitive slug={slug} />
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <MoveRight className="h-4 w-4 text-black" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
