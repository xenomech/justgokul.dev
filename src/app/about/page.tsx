import {
  AboutBanner,
  ProjectSection,
  SocialsSection,
  ToolsSection,
} from '@/components/sections';

export default async function page() {
  return (
    <div className="mx-4 max-w-7xl py-40 font-inter xl:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <AboutBanner />
        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 lg:flex-row">
          <ToolsSection />
          <SocialsSection />
        </div>
        <ProjectSection />
      </div>
    </div>
  );
}
