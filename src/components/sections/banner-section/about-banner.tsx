'use client';
import { EMOJI_LIST } from '@/assets/emoji';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { GH_URL, GetGitProfile } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SocialsSection } from '../socials-section';

export const AboutBanner = () => {
  const { data, isLoading } = useSWR(GH_URL, (input) => {
    return GetGitProfile(input);
  });
  console.log(data);
  const router = useRouter();
  return (
    <section className="flex w-full flex-col items-start justify-center max-w-4xl mx-auto p-2 mt-4 rounded-lg dash gap-8">
      <div className="flex flex-col items-start justify-start gap-6 relative h-60 bg-orange-300/60 w-full p-4 rounded-md">
        <Button
          className="flex items-center justify-center gap-2 z-10"
          variant="navigator"
          onClick={() => router.back()}
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          <p>Go Back</p>
        </Button>
        <FancyEmojiBG />
        <div className="absolute p-2 bg-base-100 -bottom-20 rounded-full left-6">
          <div className="relative w-36 h-36">
            <Image
              src={data?.avatar_url}
              alt=""
              fill
              className="bg-cover rounded-full"
            />
          </div>
        </div>
        {/* <h1 className="heading">About</h1> */}
        {/* <p className="subheading max-w-2xl">
          Hey, I&apos;m Gokul Suresh, a software engineer from Kochi, Kerala!
          🖥️💡 Music lover, distro hopper, exploring tech and everything in
          between.🚀 #SoftwareEngineer #TechEnthusiast #Freelancer
        </p> */}
      </div>
      <div className="mt-20 w-full">
        <div className="flex items-center justify-between">
          <div className="max-w-xs">
            <h1>{data?.name}</h1>
            <h1>{data?.login}</h1>
            <p>{data?.bio}</p>
            <p></p>
          </div>
          <SocialsSection />
        </div>
      </div>
    </section>
  );
};

const FancyEmojiBG = () => {
  const RANDOM_EMOJIS = [
    ...EMOJI_LIST.sort(() => Math.random() - 0.5),
    ...EMOJI_LIST.sort(() => Math.random() - 1),
  ];
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return;
  }
  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <div className="flex justify-center items-center flex-wrap gap-6 mt-2 infinte-scroll opacity-60">
          {RANDOM_EMOJIS.map((item, index) => (
            <span className="text-2xl" key={index + 2}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
