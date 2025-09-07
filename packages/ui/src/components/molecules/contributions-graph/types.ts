export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
  range: {
    start: string;
    end: string;
  };
}

export interface ContributionsGraphProps {
  data: ContributionData;
  username?: string;
  className?: string;
  showStats?: boolean;
  theme?: 'light' | 'dark' | 'github';
}
