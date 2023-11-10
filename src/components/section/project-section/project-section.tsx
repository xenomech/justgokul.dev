import { PROJECTS } from '@/assets/store';
import { Chips } from '@/components/chips';
import Image from 'next/image';

export const ProjectSection = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 md:mx-auto md:max-w-3xl md:flex-row-reverse">
      <div className="illustration md:-mt-20">
        <div className="relative hidden h-36 w-36 md:flex">
          <Image
            src={`https://static.justgokul.dev/assets/projects_desktop.svg`}
            alt="Projects"
            className="object-contain"
            fill
            priority
          />
        </div>
        <div className="relative flex h-36 w-44 md:hidden">
          <Image
            src={`https://static.justgokul.dev/assets/projects_mobile.svg`}
            alt="projects"
            className="object-contain"
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
  );
};

export default ProjectSection;
