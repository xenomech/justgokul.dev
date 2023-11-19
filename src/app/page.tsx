import { allSnippets, allTechnicals } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import {
  LatestContentSection,
  ProjectSection,
  PublicationsSection,
} from '@/components/sections';
import { sortFrontMatter } from '@/lib/common';

export default function Home() {
  const posts = sortFrontMatter(allTechnicals);
  const snippets = sortFrontMatter(allSnippets);
  return (
    <div className="mx-4 max-w-7xl pb-28 pt-44 lg:mx-auto">
      <div className="flex flex-col items-center justify-center gap-28">
        <section className="home-banner flex w-full flex-col items-center justify-center gap-8 pt-10 ">
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
          <LatestContentSection type="blog" data={posts} />
          <LatestContentSection type="snippets" data={snippets} inverse />
        </div>
        <PublicationsSection />
        <ProjectSection />
      </div>
    </div>
  );
}
