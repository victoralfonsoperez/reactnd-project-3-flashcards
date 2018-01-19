import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import QuizView from './components/QuizView'
import DeckView from './components/DeckView'
import NewQuestionView from './components/NewQuestionView'
import { blue, green, white, gray } from './utils/colors'
import reducer from './reducers'
import setNotification from './utils/helpers'

const CustomStatusBar = styled.View`
  backgroundColor: ${blue};
  height: ${Constants.statusBarHeight};
`

const FlashCardsStatusBar = () => (
  <CustomStatusBar>
    <StatusBar translucent barStyle="light-content" />
  </CustomStatusBar>
)

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'List of Decks',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="th-list" size={30} color={tintColor} />
        ),
      },
    },
    AddDeck: {
      screen: NewDeckView,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: white,
      inactiveTintColor: gray,
      activeBackgroundColor: green,
      inactiveBackgroundColor: white,
    },
  },
)

const MainNav = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
        height: Constants.statusBarHeight,
        padding: 20,
      },
    },
  },
  AddQuestion: {
    screen: NewQuestionView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
        height: Constants.statusBarHeight,
        padding: 20,
      },
    },
  },
  Quiz: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
        height: Constants.statusBarHeight,
        padding: 20,
      },
    },
  },
})

const store = createStore(reducer)

class App extends Component {
  componentDidMount() {
    setNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar />
          <MainNav />
        </View>
      </Provider>
    )
  }
}

export default App
