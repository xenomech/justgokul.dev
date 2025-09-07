import {
  TicketCard,
  SimpleCard,
  type TicketCardProps,
  type SimpleCardProps,
  TICKET_CARD_DEFAULTS,
} from '@repo/ui';
import { type StoryContent } from '@/lib/common';

/**
 * Event handlers for card interactions
 */
export interface CardHandlers {
  onClick?: (content: StoryContent) => void;
}

/**
 * Creates a TicketCardConfig from StoryContent
 */
const createTicketCardConfig = (story: StoryContent, handlers?: CardHandlers): TicketCardProps => {
  return {
    ticketColor: story.ticketColor || '#FFB300',
    airline: {
      name: TICKET_CARD_DEFAULTS.airline.name,
      iconName: TICKET_CARD_DEFAULTS.airline.iconName,
    },
    departure: story.departure || { code: 'JFK', city: 'New York' },
    arrival: story.arrival || { code: 'SFO', city: 'San Francisco' },
    passenger: story.passenger || { name: 'Rex, Anonasaurus', seat: '45A' },
    flight: TICKET_CARD_DEFAULTS.flight,
    onClick: handlers?.onClick ? () => handlers.onClick!(story) : undefined,
  };
};

/**
 * Creates a SimpleCardConfig from StoryContent
 */
const createSimpleCardConfig = (story: StoryContent, handlers?: CardHandlers): SimpleCardProps => {
  return {
    title: story.title,
    excerpt: story.excerpt,
    readingTime: story.readingTime,
    date: story.date,
    slug: story.slug,
    onClick: handlers?.onClick ? () => handlers.onClick!(story) : undefined,
  };
};

/**
 * Card type registry with component and prop mapper
 */
export const CARD_TYPE_REGISTRY = {
  ticket: {
    component: TicketCard,
    propMapper: createTicketCardConfig,
  },
  simple: {
    component: SimpleCard,
    propMapper: createSimpleCardConfig,
  },
} as const;

/**
 * Available card types
 */
export type CardType = keyof typeof CARD_TYPE_REGISTRY;

/**
 * Component factory that returns the appropriate component and props
 */
export class StoryCardFactory {
  /**
   * Get component and props for a given card type and story content
   */
  static createCard(cardType: CardType, storyContent: StoryContent, handlers?: CardHandlers) {
    const registry = CARD_TYPE_REGISTRY[cardType];

    if (!registry) {
      throw new Error(`Unknown card type: ${cardType}`);
    }

    const { component, propMapper } = registry;
    const props = propMapper(storyContent, handlers);

    return {
      component,
      props,
    };
  }

  /**
   * Get all available card types
   */
  static getAvailableCardTypes(): CardType[] {
    return Object.keys(CARD_TYPE_REGISTRY) as CardType[];
  }

  /**
   * Check if a card type is supported
   */
  static isCardTypeSupported(cardType: string): cardType is CardType {
    return cardType in CARD_TYPE_REGISTRY;
  }

  /**
   * Get the default card type
   */
  static getDefaultCardType(): CardType {
    return 'ticket';
  }

  /**
   * Create card with fallback to default type
   */
  static createCardWithFallback(
    cardType: string | undefined,
    storyContent: StoryContent,
    handlers?: CardHandlers
  ) {
    const validCardType = this.isCardTypeSupported(cardType || '')
      ? (cardType as CardType)
      : this.getDefaultCardType();

    return this.createCard(validCardType, storyContent, handlers);
  }
}

/**
 * Type-safe card creation function
 */
export function createStoryCard(
  cardType: CardType,
  storyContent: StoryContent,
  handlers?: CardHandlers
) {
  return StoryCardFactory.createCard(cardType, storyContent, handlers);
}

/**
 * Type-safe card creation with fallback
 */
export function createStoryCardWithFallback(
  cardType: string | undefined,
  storyContent: StoryContent,
  handlers?: CardHandlers
) {
  return StoryCardFactory.createCardWithFallback(cardType, storyContent, handlers);
}
