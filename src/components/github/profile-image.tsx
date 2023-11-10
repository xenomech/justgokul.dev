'use client';
import { GH_URL, GetGitProfile } from '@/lib/api';
import clsx from 'clsx';
import Image from 'next/image';
import useSWR from 'swr';
type ProfileImagePropType = {
  className?: string;
};
function ProfileImage({ className }: ProfileImagePropType) {
  const { data, isLoading } = useSWR(GH_URL, (input) => {
    return GetGitProfile(input);
  });
  return (
    <div className={clsx('p-2 dash rounded-2xl', className)}>
      <div className="relative w-80 h-80">
        {isLoading ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/25 animate-pulse z-10 rounded-xl"></div>
        ) : (
          <Image
            src={data?.avatar_url}
            alt="test"
            fill
            className="object-cover rounded-xl"
          />
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
