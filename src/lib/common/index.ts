// common functions to simplify the codebase
import { Photography, Post, Snippet } from '.contentlayer/generated';
import { format } from 'date-fns';

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
  lookupImages?: string[]
};
export const sortFrontMatter = (
  data: (Post | Snippet | Photography)[]
): FrontMatterType[] => {
  const posts = data.sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
  return posts.map((item) => {
    return {
      title: item.title,
      date: convertDateToString(item.date),
      draft: item.draft,
      category: item.category,
      readingTime: (item as any).readingTime?.text ?? "",
      slug: item.slug,
      language: item.language,
      lookupImages: (item as any).lookupImages ?? [],
    };
  });
};

export const returnSelectedFields = (
  data: Post[] | Snippet[] | Photography[]
) => {
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
