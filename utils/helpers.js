import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'FlashCards:decks'

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
}

export const getDeck = async (id) => {
  try {
    const store = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    alert(store.id)
  } catch (error) {
    alert(error)
  }
}

export function saveDeckTitle(id, data) {
  AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [id]: data,
  }))
    .then(() => AsyncStorage.getItem(FLASHCARD_STORAGE_KEY))
}

export const addCardToDeck = ({ title, card }) => {
  // Adds the card to the list of questions for the deck associated with the title
}

