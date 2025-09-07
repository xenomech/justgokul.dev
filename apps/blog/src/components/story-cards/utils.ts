import { type StoryContent } from '@/lib/common';
import { StoryCardFactory, type CardType } from './factory';

/**
 * Utility functions for working with story cards
 */

/**
 * Get the appropriate card type for a story, with fallback to default
 */
export function getCardTypeForStory(story: StoryContent): CardType {
  if (story.cardType && StoryCardFactory.isCardTypeSupported(story.cardType)) {
    return story.cardType as CardType;
  }
  return StoryCardFactory.getDefaultCardType();
}

/**
 * Validate that a story has the required fields for its card type
 */
export function validateStoryForCardType(story: StoryContent, cardType: CardType): boolean {
  try {
    StoryCardFactory.createCard(cardType, story);
    return true;
  } catch (error) {
    console.warn(`Story validation failed for card type ${cardType}:`, error);
    return false;
  }
}

/**
 * Get all stories that can use a specific card type
 */
export function getStoriesForCardType(stories: StoryContent[], cardType: CardType): StoryContent[] {
  return stories.filter(story => {
    const storyCardType = getCardTypeForStory(story);
    return storyCardType === cardType;
  });
}

/**
 * Get card type statistics for a collection of stories
 */
export function getCardTypeStats(stories: StoryContent[]): Record<CardType, number> {
  const stats = {} as Record<CardType, number>;

  StoryCardFactory.getAvailableCardTypes().forEach(type => {
    stats[type] = 0;
  });

  stories.forEach(story => {
    const cardType = getCardTypeForStory(story);
    stats[cardType]++;
  });

  return stats;
}

/**
 * Check if a story should use a specific card type based on its content
 */
export function shouldUseCardType(story: StoryContent, cardType: CardType): boolean {
  switch (cardType) {
    case 'ticket':
      return !!(story.departure || story.arrival || story.passenger || story.ticketColor);

    case 'simple':
      return !story.departure && !story.arrival && !story.passenger;

    default:
      return false;
  }
}

/**
 * Auto-suggest card type based on story content
 */
export function suggestCardType(story: StoryContent): CardType {
  if (shouldUseCardType(story, 'ticket')) {
    return 'ticket';
  }

  return 'simple';
}
