import { Separator } from '@/assets/icons';
import { ExperienceSection } from './_components/experience-section';
import { HeroSection } from './_components/hero-section';
import { ProjectsSection } from './_components/projects-section';
import { SocialSection } from './_components/social-section';

function SectionWithSeparator({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div className="flex w-full items-center justify-center">
        <Separator className="h-fit w-32 py-6" />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="font-inter mx-4 max-w-4xl py-40 lg:mx-auto">
      <div className="space-y-10">
        <SectionWithSeparator>
          <HeroSection />
        </SectionWithSeparator>

        <SectionWithSeparator>
          <div className="space-y-10">
            <SocialSection />
            <ExperienceSection />
          </div>
        </SectionWithSeparator>

        <div>
          <ProjectsSection />
        </div>
      </div>
    </div>
  );
}
