import { allPosts, allSnippets } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import { PROJECTS, PUBLICATIONS } from '@/assets/store';
import Button from '@/components/button/Button';
import Chips from '@/components/chips/Chips';
import ListCard from '@/components/list/ListCard';
import { FrontMatterType, sortFrontMatter } from '@/lib/common';
import Image from 'next/image';
export default function Home() {
  const posts = sortFrontMatter(allPosts);
  const snippets = sortFrontMatter(allSnippets);
  return (
    <div className="mx-4 max-w-7xl pb-28 pt-44 lg:mx-auto">
      <div className="flex flex-col items-center justify-center gap-28">
        <section className="flex w-full flex-col items-center justify-center gap-8 bg-[url('https://static.justgokul.dev/hero-bg-desktop.png')] bg-cover bg-center pt-10 ">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="heading">Hey, 👋 I&apos;m Gokul</h1>
            <p className="subheading max-w-2xl">
              Welcome to my spot on the web. I am a software engineer who builds
              and occasionally design websites and apps. I started this blog to
              keep track of the things I do! Glad you are here!
            </p>
          </div>
          <Button
            type="Primary"
            className="flex items-center justify-center gap-2 transition-all duration-100 ease-in-out hover:scale-105"
            action="Link"
            url="https://share.justgokul.dev"
          >
            <p className="font-medium">Connect</p>
            <ArrowIcon className="h-3 w-3" />
          </Button>
        </section>
        <div className="mx-auto flex flex-col items-center justify-center gap-28 md:max-w-4xl">
          <RenderPostSnippetSection type="blog" data={posts} />
          <RenderPostSnippetSection type="snippets" data={snippets} inverse />
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-4 md:mx-auto md:max-w-4xl md:flex-row">
          <div className="illustration md:-mt-20">
            <div className="relative hidden h-40 w-52 md:flex">
              <Image
                src={`https://static.justgokul.dev/assets/publications_desktop.svg`}
                alt="publications"
                fill
                priority
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src={`https://static.justgokul.dev/assets/publications_mobile.svg`}
                alt="publications"
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
        <div className="flex w-full flex-col items-start justify-start gap-4 md:mx-auto md:max-w-3xl md:flex-row-reverse">
          <div className="illustration md:-mt-20">
            <div className="relative hidden h-36 w-36 md:flex">
              <Image
                src={`https://static.justgokul.dev/assets/projects_desktop.svg`}
                alt="Projects"
                fill
                priority
              />
            </div>
            <div className="relative flex h-36 w-44 md:hidden">
              <Image
                src={`https://static.justgokul.dev/assets/projects_mobile.svg`}
                alt="projects"
                fill
                priority
              />
            </div>
          </div>
          <div className="dash flex w-full flex-wrap gap-6 rounded-lg p-6 md:w-[540px]">
            {PROJECTS.map((item) => (
              <Chips key={item.title} title={item.title} url={item.url} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type RenderPostSnippetSectionType = {
  type: string;
  inverse?: boolean;
  data: FrontMatterType[];
};
const RenderPostSnippetSection = ({
  type,
  inverse,
  data,
}: RenderPostSnippetSectionType) => {
  return (
    <section
      className={`flex w-full flex-col items-start justify-between gap-4 lg:flex-row ${
        inverse && 'lg:flex-row-reverse'
      }`}
    >
      <div className="illustration">
        <div className="relative hidden h-40 w-60 lg:flex">
          <Image
            src={`https://static.justgokul.dev/assets/latest_${type}_desktop.svg`}
            alt="latestPosts"
            fill
            priority
          />
        </div>
        <div className="relative flex h-36 w-64 lg:hidden">
          <Image
            src={`https://static.justgokul.dev/assets/latest_${type}_mobile.svg`}
            alt="latestPosts"
            fill
            priority
          />
        </div>
      </div>
      <div className="posts w-full md:w-[650px]">
        {data.slice(0, 5).map((item) => (
          <ListCard
            title={item.title}
            slug={item.slug}
            readingTime={item.readingTime}
            date={item.date}
            type={type}
            key={item.slug}
          />
        ))}
      </div>
    </section>
  );
};
