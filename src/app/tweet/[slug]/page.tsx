import { ArrowIcon } from '@/assets/icons';
import { TWEET_ID } from '@/assets/store';
import { Button } from '@/components/button';
import { Embed } from '@/components/twitter';

// NOT USED ANY MORE
export default async function Tweet({ params }: { params: { slug: string } }) {
  const tweet = TWEET_ID.filter((item) => item.slug === params.slug)[0];
  return (
    <div className="mx-4 min-h-screen max-w-7xl py-28 md:mx-auto">
      <section className="flex w-full flex-col items-start justify-center gap-8 pt-24">
        <div className="flex flex-col items-start justify-start gap-9 lg:ml-56">
          <Button
            className="flex items-center justify-center gap-2"
            type="Navigator"
            action="Navigate"
            url='/'
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            <p>Go Back</p>
          </Button>
          <div className="flex flex-col items-start justify-start gap-2">
            <h1 className="text-3xl font-semibold sm:text-4xl">
              {tweet.title}
            </h1>
            <p className="py-2 text-lg font-medium text-black text-opacity-50">
              {tweet.desc}
            </p>
          </div>
        </div>
      </section>
      <div className="pt-10">
        {tweet.id.map((id) => (
          <div className="mx-auto max-w-2xl" key={id}>
            <Embed id={id} />
          </div>
        ))}
      </div>
    </div>
  );
}
