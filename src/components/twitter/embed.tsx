'use client';
import TweetEmbed from 'react-tweet-embed';

export const Embed = ({ id }: { id: string }) => {
  return (
    <TweetEmbed
      className="m-2 flex items-center justify-center"
      tweetId={id}
      placeholder={'loading'}
    />
  );
};
