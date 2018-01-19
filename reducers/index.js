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
        [deck]: {
          title: deck,
          questions: [],
        },
      }
    case ADD_CARD:
      return {
        ...state,
        [card.deck]: {
          ...state[card.deck],
          questions: [...state[card.deck].questions, { question, answer, correct }],
        },
      }
    default:
      return state
  }
}

export default decks
