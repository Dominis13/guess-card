import { shuffle } from 'lodash';
import config from '../appConfig';

/**
 * Gathering the Deck for a game. Prepare ID and image link for a card objects.
 * @param pairs {number} - amount of pairs we want to generate
 * @return {object[]} amount of records are pairs * 2
 */
export default (pairs) => {
  const imagesInConfig = config.images.length;
  if (pairs > imagesInConfig) {
    console.warn('Haven\'t enough cards to start the game, generating fallback');
    const extra = new Array(pairs - imagesInConfig).fill('');
    config.images = config.images.concat(extra);
  }

  // getting random list of all available cards for a game
  const wholeDeck = shuffle(config.images.map((image = '', index) => {
    return {
      id: index,
      image,
    }
  }));

  // taking only amount of cards we need for a particular game
  const deck = wholeDeck.slice(0, pairs);

  // doubling the cards in deck and shuffle them
  return shuffle(deck.concat(deck));
}
