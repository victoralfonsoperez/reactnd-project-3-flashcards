import { FETCH_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  const {
    deck,
    answer,
    question,
    correct,
    card,
  } = action

  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: [],
        },
      }
    case ADD_CARD:
    const { deck,
      question,
      answer,
      correct } = card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, { question, answer, correct }],
        },
      }
    default:
      return state
  }
}

export default decks
