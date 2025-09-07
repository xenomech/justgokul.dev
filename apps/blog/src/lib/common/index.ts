import { Story, Post, Snippet } from '.contentlayer/generated';
import { sortDateDescending } from '@repo/utils';

/**
 * Base interface for all content types
 */
export interface BaseContent {
  title: string;
  date: string;
  draft: boolean;
  excerpt: string;
  category: string;
  readingTime: string;
  slug: string;
  language: string[];
}

/**
 * Post-specific interface
 */
export interface PostContent extends BaseContent {
  type: 'Post';
}

/**
 * Snippet-specific interface
 */
export interface SnippetContent extends BaseContent {
  type: 'Snippet';
}

/**
 * Story-specific interface with ticket information
 */
export interface StoryContent extends BaseContent {
  type: 'Story';
  lookupImages: string[];
  cardType?: string;
  ticketColor?: string;
  departure?: {
    code?: string;
    city?: string;
    location?: string;
    time?: string;
  };
  arrival?: {
    code?: string;
    city?: string;
    location?: string;
    time?: string;
  };
  passenger?: {
    name: string;
    seat: string;
  };
}

/**
 * Union type for all content types
 */
export type ContentType = PostContent | SnippetContent | StoryContent;

/**
 * Type guard to check if content is a Post
 */
export const isPost = (content: ContentType): content is PostContent => {
  return content.type === 'Post';
};

/**
 * Type guard to check if content is a Snippet
 */
export const isSnippet = (content: ContentType): content is SnippetContent => {
  return content.type === 'Snippet';
};

/**
 * Type guard to check if content is a Story
 */
export const isStory = (content: ContentType): content is StoryContent => {
  return content.type === 'Story';
};

/**
 * Transforms a Post document to PostContent
 */
export const transformPost = (post: Post): PostContent => {
  return {
    type: 'Post',
    title: post.title,
    date: post.date,
    draft: post.draft,
    excerpt: post.excerpt,
    category: post.category,
    readingTime: post.readingTime?.text ?? '',
    slug: post.slug,
    language: post.language,
  };
};

/**
 * Transforms a Snippet document to SnippetContent
 */
export const transformSnippet = (snippet: Snippet): SnippetContent => {
  return {
    type: 'Snippet',
    title: snippet.title,
    date: snippet.date,
    draft: snippet.draft,
    excerpt: snippet.excerpt,
    category: snippet.category,
    readingTime: snippet.readingTime?.text ?? '',
    slug: snippet.slug,
    language: snippet.language,
  };
};

/**
 * Transforms a Story document to StoryContent
 */
export const transformStory = (story: Story): StoryContent => {
  return {
    type: 'Story',
    title: story.title,
    date: story.date,
    draft: story.draft,
    excerpt: story.excerpt,
    category: story.category,
    readingTime: story.readingTime?.text ?? '',
    slug: story.slug,
    language: story.language,
    lookupImages: story.lookupImages,
    cardType: story.cardType,
    ticketColor: story.ticketColor,
    departure: story.departure,
    arrival: story.arrival,
    passenger: story.passenger,
  };
};

/**
 * Transforms and sorts an array of Posts
 */
export const transformAndSortPosts = (posts: Post[]): PostContent[] => {
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => sortDateDescending(a.date, b.date))
    .map(transformPost);
};

/**
 * Transforms and sorts an array of Snippets
 */
export const transformAndSortSnippets = (snippets: Snippet[]): SnippetContent[] => {
  return snippets
    .filter(snippet => !snippet.draft)
    .sort((a, b) => sortDateDescending(a.date, b.date))
    .map(transformSnippet);
};

/**
 * Transforms and sorts an array of Stories
 */
export const transformAndSortStories = (stories: Story[]): StoryContent[] => {
  return stories
    .filter(story => !story.draft)
    .sort((a, b) => sortDateDescending(a.date, b.date))
    .map(transformStory);
};
