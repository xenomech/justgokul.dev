import { Button } from '@repo/ui';
import { MoveRight, MapPin, ExternalLink, Activity } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { USER_INFO } from '@/assets/store';

export function HeroSection() {
  return (
    <section className="relative">
      <Link href="/" className="mb-8 inline-block">
        <Button variant="back" leftIcon={<MoveRight className="h-4 w-4 rotate-180" />}>
          Go Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                {USER_INFO.title}
              </h1>
              <h2 className="text-2xl font-medium text-gray-600 md:text-3xl">{USER_INFO.name}</h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{USER_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>{USER_INFO.status}</span>
              </div>
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">{USER_INFO.bio}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={USER_INFO.contactUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" rightIcon={<ExternalLink className="h-4 w-4" />}>
                Get In Touch
              </Button>
            </Link>
            <Link
              href={`https://github.com/${USER_INFO.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="navigator">GitHub</Button>
            </Link>
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative">
          <div className="mx-auto aspect-square w-full max-w-sm">
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-900/5">
              <Image
                src={USER_INFO.profileImage}
                alt={USER_INFO.name}
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
