import { allPosts, allSnippets } from '.contentlayer/generated';
import {
  HomeBanner,
  LatestContentSection,
  ProjectSection,
  PublicationsSection,
} from '@/components/sections';
import { sortFrontMatter } from '@/lib/common/transforms';

export default function Home() {
  const posts = sortFrontMatter(allPosts);
  const snippets = sortFrontMatter(allSnippets);
  return (
    <div className="mx-4 max-w-7xl pb-28 pt-44 lg:mx-auto">
      <div className="flex flex-col items-center justify-center gap-28">
        <HomeBanner />
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
