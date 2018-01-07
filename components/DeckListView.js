import React, { Component } from 'react'
import styled from 'styled-components/native'
import { white, gray, lightblue, darkgreen } from '../utils/colors'

const DeckContainer = styled.FlatList`
  flex: 1;
  padding: 20px 0 40px 0;
  background-color: ${gray};
`

const Deck = styled.View`
  align-items: center;  
  flex: 1;
  background-color: ${white};
  border: 1px solid ${gray};
  border-radius: 10px;
  height: 25%;
  justify-content: center;
  margin: 5px;
  padding: 40px 0;
  shadow-color: ${lightblue};
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3;
`

const DeckTitle = styled.Text`
  color: #000;
  font-size: 24px;
`

const DeckCardsNumber = styled.Text`
  font-size: 18px;
  color: ${darkgreen};
`

class DeckListView extends Component {
  state = {
    data: [
      { title: 'first deck title', cardnumber: 2, key: 0 },
      { title: 'SECOND DECK TITLE', cardnumber: 0, key: 1 },
      { title: 'FIRST DECK TITLE', cardnumber: 2, key: 2 },
      { title: 'SECOND DECK TITLE', cardnumber: 0, key: 3 },
      { title: 'FIRST DECK TITLE', cardnumber: 2, key: 4 },
      { title: 'SECOND DECK TITLE', cardnumber: 0, key: 5 },
      { title: 'FIRST DECK TITLE', cardnumber: 2, key: 6 },
      { title: 'SECOND DECK TITLE', cardnumber: 0, key: 7 },
    ],
  }

  renderDeck = ({ item }) => (
    <Deck key={item.key}>
      <DeckTitle>{item.title.toUpperCase()}</DeckTitle>
      <DeckCardsNumber>{`DECK CARD NUMBER IS ${item.cardnumber}`}</DeckCardsNumber>
    </Deck>
  )

  render() {
    const { data } = this.state

    return (
      <DeckContainer
        data={data}
        renderItem={this.renderDeck}
      />
    )
  }
}

export default DeckListView
