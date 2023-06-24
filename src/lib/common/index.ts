// common functions to simplify the codebase

import { Post, Snippet } from '.contentlayer/generated';

import format from 'date-fns/format';

export const convertDateToString = (date: string) => {
  return format(new Date(date), 'PPPP');
};

export const sortFrontMatter = (data: Post[] | Snippet[]) => {
  const posts = data.sort(
    (a: Post | Snippet, b: Post | Snippet) =>
      +new Date(b.date) - +new Date(a.date)
  );
  return posts.map((_: Post | Snippet) => {
    return {
      title: _.title,
      date: convertDateToString(_.date),
      draft: _.draft,
      category: _.category,
      readingTime: _.readingTime,
      slug: _.slug,
    };
  });
};
