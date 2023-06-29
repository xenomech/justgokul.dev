import { ArrowIcon } from '@/assets/icons';
import { SOCIALS, STACK } from '@/assets/store';
import Button from '@/components/button/Button';
import Image from 'next/image';

export default async function page() {
  return (
    <div className="mx-4 max-w-7xl py-40 font-inter lg:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <section className="mt-9 flex w-full flex-col items-start justify-center gap-8 md:mx-56">
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

        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 md:flex-row">
          {/* stack */}
          <div className="flex flex-col items-start justify-start gap-4 md:mx-auto md:max-w-xl md:flex-row md:gap-8">
            <div className="illustration">
              <div className="relative hidden h-40 w-32 md:flex">
                <Image
                  src={`/assets/tools_i_use_desktop.svg`}
                  alt="Projects"
                  fill
                  priority
                />
              </div>
              <div className="relative flex h-40 w-40 md:hidden">
                <Image
                  src={`/assets/tools_i_use_mobile.svg`}
                  alt="projects"
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
                      className="pointer-events-none"
                      src={`/media/stack/${item}.png`}
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
          {/* socials */}
          <div className="flex flex-col items-start justify-start gap-4 md:mx-auto md:max-w-xl md:flex-row-reverse md:gap-8">
            <div className="illustration">
              <div className="relative hidden h-32 w-32 md:flex">
                <Image
                  src={`/assets/socials_desktop.svg`}
                  alt="Projects"
                  fill
                  priority
                />
              </div>
              <div className="relative flex h-40 w-40 md:hidden">
                <Image
                  src={`/assets/socials_mobile.svg`}
                  alt="projects"
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
                      className="pointer-events-none"
                      src={`/media/social/${item.name}.svg`}
                      alt={item.name}
                      fill
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
