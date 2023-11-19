import { PUBLICATIONS } from '@/assets/store';
import Image from 'next/image';

export const PublicationsSection = () => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 md:mx-auto md:max-w-4xl md:flex-row">
      <div className="illustration md:-mt-20">
        <div className="relative hidden h-40 w-52 md:flex">
          <Image
            src={`https://static.justgokul.dev/assets/publications_desktop.svg`}
            alt="publications"
            className="object-contain"
            fill
            priority
          />
        </div>
        <div className="relative flex h-40 w-60 md:hidden">
          <Image
            src={`https://static.justgokul.dev/assets/publications_mobile.svg`}
            alt="publications"
            className="object-contain"
            fill
            priority
          />
        </div>
      </div>
      <div className="dash flex w-full flex-wrap gap-6 rounded-lg p-6">
        {PUBLICATIONS.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-start justify-start gap-2"
          >
            <a
              href={item.url}
              className="text-lg font-semibold transition-all duration-150 ease-in-out hover:translate-x-2"
            >
              {item.title}
            </a>
            <a
              href={item.publishedIn.publisherBaseUrl}
              className="text-sm opacity-60 transition-all duration-150 ease-in-out hover:scale-105"
            >
              {item.publishedIn.publisherLabel}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
