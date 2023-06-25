'use client';
import TweetEmbed from 'react-tweet-embed';

export default function Embed({ id }: { id: string }) {
  return (
    <TweetEmbed
      className="flex items-center justify-center m-2"
      tweetId={id}
      placeholder={'loading'}
    />
  );
}
