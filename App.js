import React, { Component } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { TabNavigator } from 'react-navigation'
import DeckListView from './components/DeckListView'

const Container = styled.View`
  flex: 1;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
`

const NewDeck = () => (
  <Container>
    <Text>This is a second contained text</Text>
  </Container>
)

const Tabs = TabNavigator({
  Decks: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'List of Decks',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
    },
  },
})

class App extends Component {
  render() {
    return (
      <Tabs />
    )
  }
}

export default App
