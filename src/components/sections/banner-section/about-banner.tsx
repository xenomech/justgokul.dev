'use client';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { useRouter } from 'next/navigation';

export const AboutBanner = () => {
  const router = useRouter();
  return (
    <section className="mt-9 flex w-full flex-col items-start justify-center gap-8 xl:mx-56">
      <div className="flex flex-col items-start justify-start gap-6 ">
        <Button
          className="flex items-center justify-center gap-2"
          variant="navigator"
          onClick={() => router.back()}
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          <p>Go Back</p>
        </Button>
        <h1 className="heading">About</h1>
        <p className="subheading max-w-2xl">
          Hey, I&apos;m Gokul Suresh, a software engineer from Kochi, Kerala!
          🖥️💡 Music lover, distro hopper, exploring tech and everything in
          between.🚀 #SoftwareEngineer #TechEnthusiast #Freelancer
        </p>
      </div>
    </section>
  );
};
