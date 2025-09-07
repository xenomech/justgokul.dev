export type FrontMatterType = {
  title: string;
  date: string;
  draft: boolean;
  category: string;
  readingTime: string;
  slug: string;
  language: string[];
  lookupImages?: string[];
  ticketColor?: string;
  departure?: {
    code: string;
    city: string;
  };
  arrival?: {
    code: string;
    city: string;
  };
  passenger?: {
    name: string;
    seat: string;
  };
};
