import { format } from 'date-fns';

/**
 * Converts a date string to a formatted string
 */
export const convertDateToString = (date: string, display: 'full' | '/' = 'full'): string => {
  const displayType = {
    full: 'PPPP',
    '/': 'P',
  } as const;

  return format(new Date(date), displayType[display]);
};

/**
 * Formats a date string for tooltip display
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Sorts dates in descending order (newest first)
 */
export const sortDateDescending = (a: string, b: string): number => {
  return +new Date(b) - +new Date(a);
};

/**
 * Sorts dates in ascending order (oldest first)
 */
export const sortDateAscending = (a: string, b: string): number => {
  return +new Date(a) - +new Date(b);
};

/**
 * Gets day of week (0 = Sunday, 6 = Saturday)
 */
export const getDayOfWeek = (date: string): number => {
  return new Date(date).getDay();
};

/**
 * Gets current date
 */
export const getCurrentDate = (): Date => {
  return new Date();
};

/**
 * Converts date to timestamp
 */
export const dateToTimestamp = (date: string): number => {
  return new Date(date).getTime();
};
