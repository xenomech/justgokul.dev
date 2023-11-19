import { SOCIALS } from '@/assets/store';
import Image from 'next/image';

export const SocialsSection = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 md:mx-auto md:max-w-xl md:flex-row-reverse md:gap-8">
      <div className="illustration">
        <div className="relative hidden h-40 w-32 md:flex">
          <Image
            src={`https://static.justgokul.dev/assets/socials_desktop.svg`}
            alt="socials"
            className="object-contain"
            fill
            priority
          />
        </div>
        <div className="relative flex h-40 w-40 md:hidden">
          <Image
            src={`https://static.justgokul.dev/assets/socials_mobile.svg`}
            alt="socials"
            className="object-contain"
            fill
            priority
          />
        </div>
      </div>
      <div className="dash grid grid-cols-3 gap-4 rounded-lg p-4 md:grid-cols-4">
        {SOCIALS.map((item) => (
          <a
            href={item.url}
            key={item.name}
            className="flex items-center justify-center justify-self-center rounded-lg border-[1px] border-black border-opacity-10 p-2 transition-all duration-150 ease-in-out hover:scale-110"
          >
            <div className="relative h-8 w-8">
              <Image
                className="pointer-events-none bg-contain"
                src={`https://static.justgokul.dev/media/social/${item.name}.svg`}
                alt={item.name}
                fill
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
