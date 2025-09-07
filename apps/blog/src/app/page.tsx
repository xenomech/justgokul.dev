import { allPosts, allSnippets } from '.contentlayer/generated';
import { PROJECTS, PUBLICATIONS } from '@/assets/store';
import { Button, Chips, ListCard } from '@repo/ui';
import { convertDateToString } from '@repo/utils';
import {
  transformAndSortPosts,
  transformAndSortSnippets,
  type PostContent,
  type SnippetContent,
} from '@/lib/common';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PhotoGallery from '@/components/photo-gallery';

export default function Home() {
  const posts = transformAndSortPosts(allPosts);
  const snippets = transformAndSortSnippets(allSnippets);

  const galleryImages = [
    { src: '/media/home/index6.JPG', alt: 'Life captured' },
    { src: '/media/home/index3.JPG', alt: 'Memories' },
    {
      src: '/media/home/index7.JPG',
      alt: 'Home moments',
      priority: true,
      objectPosition: 'object-bottom' as const,
    },
    { src: '/media/home/index5.jpg', alt: 'moments' },
    { src: '/media/home/index2.JPG', alt: 'Life captured', objectPosition: 'object-top' as const },
  ];

  return (
    <div className="mx-4 max-w-7xl pb-28 pt-44 lg:mx-auto">
      <div className="flex flex-col items-center justify-center gap-28">
        <section className="home-banner flex w-full flex-col items-center justify-center gap-8 pt-10 ">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="heading">Hey, 👋 I&apos;m Gokul</h1>
            <p className="subheading max-w-2xl">
              Welcome to my spot on the web. I am a software engineer who builds and occasionally
              design websites and apps. I started this blog to keep track of the things I do! Glad
              you are here!
            </p>
          </div>
          <Link href="https://share.justgokul.dev" target="_blank" rel="noopener noreferrer">
            <Button variant="link" rightIcon={<MoveRight className="h-3 w-3" />}>
              <span className="font-medium">Connect</span>
            </Button>
          </Link>
        </section>
        <div className="mx-auto flex flex-col items-center justify-center gap-28 md:max-w-4xl">
          <RenderPostSnippetSection type="blog" data={posts} />
          <RenderPostSnippetSection type="snippets" data={snippets} inverse />
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-4 md:mx-auto md:max-w-4xl md:flex-row">
          <div className="illustration md:-mt-20">
            <div className="relative hidden h-40 w-52 md:flex">
              <Image
                src={`/assets/publications_desktop.svg`}
                alt="publications"
                className="object-contain"
                fill
                priority
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src={`/assets/publications_mobile.svg`}
                alt="publications"
                className="object-contain"
                fill
                priority
              />
            </div>
          </div>
          <div className="dash flex w-full flex-wrap gap-6 rounded-lg p-6">
            {PUBLICATIONS.map(item => (
              <div key={item.title} className="flex flex-col items-start justify-start gap-2">
                <a
                  href={item.url}
                  className="text-lg font-semibold transition-all duration-200 ease-out hover:translate-x-2"
                >
                  {item.title}
                </a>
                <a
                  href={item.publishedIn.publisherBaseUrl}
                  className="text-sm opacity-60 transition-all duration-200 ease-out hover:scale-105"
                >
                  {item.publishedIn.publisherLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-4 md:mx-auto md:max-w-3xl md:flex-row-reverse">
          <div className="illustration md:-mt-20">
            <div className="relative hidden h-36 w-36 md:flex">
              <Image
                src={`/assets/projects_desktop.svg`}
                alt="Projects"
                className="object-contain"
                fill
                priority
              />
            </div>
            <div className="relative flex h-36 w-44 md:hidden">
              <Image
                src={`/assets/projects_mobile.svg`}
                alt="projects"
                className="object-contain"
                fill
                priority
              />
            </div>
          </div>
          <div className="dash flex w-full flex-wrap gap-6 rounded-lg p-6 md:w-[540px]">
            {PROJECTS.map(item => (
              <Link key={item.title} href={item.url} target="_blank" rel="noopener noreferrer">
                <Chips text={item.title} showExternalIcon={true} />
              </Link>
            ))}
          </div>
        </div>

        <PhotoGallery images={galleryImages} />
      </div>
    </div>
  );
}

type RenderPostSnippetSectionType = {
  type: 'snippets' | 'blog';
  inverse?: boolean;
  data: PostContent[] | SnippetContent[];
};

const RenderPostSnippetSection = ({ type, inverse, data }: RenderPostSnippetSectionType) => {
  return (
    <section
      className={`relative flex w-full flex-col items-start justify-between gap-4 lg:flex-row ${
        inverse && 'lg:flex-row-reverse'
      }`}
    >
      <div className="illustration lg:sticky lg:top-20">
        <div className="relative hidden h-40 w-60 lg:flex">
          <Image
            src={`/assets/latest_${type}_desktop.svg`}
            alt="latestPosts"
            className="object-contain"
            fill
            priority
          />
        </div>
        <div className="relative flex h-36 w-64 lg:hidden">
          <Image
            src={`/assets/latest_${type}_mobile.svg`}
            alt="latestPosts"
            className="object-contain"
            fill
            priority
          />
        </div>
      </div>
      <div className="posts dash w-full rounded-md p-4 md:w-[650px]">
        {data.slice(0, 5).map(item => (
          <Link key={item.slug} href={`/${type}/${item.slug}`}>
            <ListCard
              title={item.title}
              readingTime={item.readingTime}
              date={convertDateToString(item.date)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
