// common functions to simplify the codebase
import { Photography, Post, Snippet } from '.contentlayer/generated';
import format from 'date-fns/format';

export const convertDateToString = (date: string): string => {
  return format(new Date(date), 'PPPP');
};

export type FrontMatterType = {
  title: string;
  date: string;
  draft: boolean;
  category: string;
  readingTime: string;
  slug: string;
  language: string[];
};
export const sortFrontMatter = (
  data: Post[] | Snippet[] | Photography[]
): FrontMatterType[] => {
  const posts = data.sort(
    (a: Post | Snippet | Photography, b: Post | Snippet | Photography) =>
      +new Date(b.date) - +new Date(a.date)
  );
  return posts.map((_: Post | Snippet | Photography) => {
    return {
      title: _.title,
      date: convertDateToString(_.date),
      draft: _.draft,
      category: _.category,
      readingTime: _.readingTime.text,
      slug: _.slug,
      language: _.language,
    };
  });
};

export const returnSelectedFields = (data: Post[] | Snippet[] | Photography[]) => {
  return data.map((_) => {
    return {
      title: _.title,
      date: _.date,
      draft: _.draft,
      category: _.category,
      readingTime: _.readingTime,
      slug: _.slug,
    };
  });
};
