import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import styled from 'styled-components/native'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import { blue } from './utils/colors'

const CustomStatusBar = styled.View`
  backgroundColor: ${blue};
  height: ${Constants.statusBarHeight};
`

const FlashCardsStatusBar = () => (
  <CustomStatusBar>
    <StatusBar translucent barStyle="light-content" />
  </CustomStatusBar>
)

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
      <View style={{ flex: 1 }}>
        <FlashCardsStatusBar />
        <Tabs />
      </View>
    )
  }
}

export default App
