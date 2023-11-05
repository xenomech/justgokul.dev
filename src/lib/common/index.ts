// common functions to simplify the codebase
import { Personal, Snippet, Technical } from '.contentlayer/generated';
import format from 'date-fns/format';

export const convertDateToString = (date: string): string => {
  return format(new Date(date), 'PPPP');
};

export type FrontMatterType = {
  title: string;
  date: string;
  draft: boolean;
  category: string[];
  readingTime: string;
  slug: string;
  contentType: string;
  language?: string[];
};
export const sortFrontMatter = (
  data: Technical[] | Personal[] | Snippet[]
): FrontMatterType[] => {
  const posts = data.sort(
    (a: Technical | Personal | Snippet, b: Technical | Personal | Snippet) =>
      +new Date(b.date) - +new Date(a.date)
  );
  return posts.map((_: Technical | Personal | Snippet) => {
    return {
      title: _.title,
      date: convertDateToString(_.date),
      draft: _.draft,
      category: _.category,
      contentType: _.contentType,
      readingTime: _.readingTime.text,
      slug: _.slug,
      language: _.language,
    };
  });
};

export const returnSelectedFields = (
  data: Technical[] | Personal[] | Snippet[]
) => {
  return data.map((_) => {
    return {
      title: _.title,
      date: _.date,
      draft: _.draft,
      category: _.category,
      contentType: _.contentType,
      readingTime: _.readingTime,
      slug: _.slug,
    };
  });
};

export const getAllSlugsAsList = (
  technical: Technical[],
  personal: Personal[],
  snippet: Snippet[]
) => {
  return [...technical, ...personal, ...snippet].map((_) => _.slug);
};
