import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import styled from 'styled-components/native'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import { blue } from './utils/colors'
import reducer from './reducers'

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
      tabBarLabel: 'New Deck',
    },
  },
})

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar />
          <Tabs />
        </View>
      </Provider>
    )
  }
}

export default App
