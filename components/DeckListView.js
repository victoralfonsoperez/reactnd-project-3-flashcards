import React, { Component } from 'react'
import styled from 'styled-components/native'

const DeckContainer = styled.ScrollView`
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
  color: #CCC;
`

class DeckListView extends Component {
  render() {
    return (
      <DeckContainer>
        <Deck>
          <DeckTitle>DECK TITLE</DeckTitle>
          <DeckCardsNumber>Number of Deck Cards</DeckCardsNumber>
        </Deck>
        <Deck>
          <DeckTitle>DECK TITLE</DeckTitle>
          <DeckCardsNumber>Number of Deck Cards</DeckCardsNumber>
        </Deck>
        <Deck>
          <DeckTitle>DECK TITLE</DeckTitle>
          <DeckCardsNumber>Number of Deck Cards</DeckCardsNumber>
        </Deck>
      </DeckContainer>
    )
  }
}

export default DeckListView
