import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'

const Tabs = TabNavigator({
  Decks: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'List of Decks',
    },
  },
  NewDeckView: {
    screen: NewDeckView,
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
