import React, { Component } from 'react'
import styled from 'styled-components/native'
import { gray } from '../utils/colors'

const DeckContainer = styled.FlatList`
  flex: 1;
  padding: 20px 0 20px 0;
`

const Deck = styled.View`
  align-items: center;  
  flex: 1;
  background-color: #FFF;
  border: 2px solid #CCC;
  border-radius: 10px;
  height: 100px;
  justify-content: center;
  margin: 5px;
  padding: 40px 0;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2;
`

const DeckTitle = styled.Text`
  color: #000;
  font-size: 24px;
`

const DeckCardsNumber = styled.Text`
  font-size: 18px;
  color: ${gray};
`

class DeckListView extends Component {
  state = {
    data: [
      { title: 'FIRST DECK TITLE', cardnumber: 2, key: 0 },
      { title: 'SECOND DECK TITLE', cardnumber: 0, key: 1 },
    ],
  }

  renderDeck = ({ item }) => (
    <Deck key={item.key}>
      <DeckTitle>{item.title}</DeckTitle>
      <DeckCardsNumber>{`deck card number is ${item.cardnumber}`}</DeckCardsNumber>
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
