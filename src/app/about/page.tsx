import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import {
  ProjectSection,
  SocialsSection,
  ToolsSection,
} from '@/components/sections';

export default async function page() {
  return (
    <div className="mx-4 max-w-7xl py-40 font-inter xl:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <section className="mt-9 flex w-full flex-col items-start justify-center gap-8 xl:mx-56">
          <div className="flex flex-col items-start justify-start gap-6 ">
            <Button
              className="flex items-center justify-center gap-2"
              type="Navigator"
              action="Back"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
              <p>Go Back</p>
            </Button>
            <h1 className="heading">About</h1>
            <p className="subheading max-w-2xl">
              Hey, I&apos;m Gokul Suresh, a software engineer from Kochi,
              Kerala! 🖥️💡 Music lover, distro hopper, exploring tech and
              everything in between.🚀 #SoftwareEngineer #TechEnthusiast
              #Freelancer
            </p>
          </div>
        </section>
        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 lg:flex-row">
          {/* stack */}
          <ToolsSection />
          {/* socials */}

          <SocialsSection />
        </div>
        <ProjectSection />
      </div>
    </div>
  );
}
