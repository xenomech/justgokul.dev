import { STACK } from '@/assets/store';
import Image from 'next/image';

export const ToolsSection = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 md:mx-auto md:max-w-xl md:flex-row md:gap-8">
      <div className="illustration">
        <div className="relative hidden h-40 w-44 md:flex">
          <Image
            src={`https://static.justgokul.dev/assets/tools_i_use_desktop.svg`}
            alt="Projects"
            className="object-contain"
            fill
            priority
          />
        </div>
        <div className="relative flex h-40 w-40 md:hidden">
          <Image
            src={`https://static.justgokul.dev/assets/tools_i_use_mobile.svg`}
            alt="projects"
            className="object-contain"
            fill
            priority
          />
        </div>
      </div>
      <div className="dash grid grid-cols-3 gap-4 rounded-lg p-4 md:grid-cols-4">
        {STACK.map((item) => (
          <div
            key={item}
            className="flex items-center justify-center justify-self-center rounded-lg border-[1px] border-black border-opacity-10 bg-base-100 p-2 transition-all duration-150 ease-in-out hover:scale-110"
          >
            <div className="relative h-10 w-10">
              <Image
                className="pointer-events-none bg-contain"
                src={`https://static.justgokul.dev/media/stack/${item}.png`}
                alt={item}
                fill
              />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center rounded-lg border-[1px] border-black border-opacity-10 bg-base-100 p-2 transition-all duration-150 ease-in-out hover:scale-110">
          <div className="relative flex h-10 w-10 items-center justify-center font-semibold">
            + 6
          </div>
        </div>
      </div>
    </div>
  );
};
