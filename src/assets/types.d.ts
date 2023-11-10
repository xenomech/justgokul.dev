export interface IProject {
  title: string;
  url: string;
}

export interface ITweet {
  title: string;
  id: string[];
  slug: string;
  desc: string;
}

export interface ISocials {
  name: string;
  icon: Function<React.ReactNode>;
  url: string;
}

export type CONTENT = 'TECHNICAL' | 'PERSONAL';
