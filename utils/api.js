import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'FlashCards:decks'

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
        correct: true,
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        correct: true,
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        correct: true,
      },
    ],
  },
}

export const getInitialDecks = () => initialDecks

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      if (results === null) {
        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(initialDecks))
        return initialDecks
      }
      return JSON.parse(results)
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: [],
    },
  }))
}
