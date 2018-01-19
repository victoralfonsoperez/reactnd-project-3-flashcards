import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome } from '@expo/vector-icons'
import DeckListView from './DeckListView'
import NewDeckView from './NewDeckView'
import QuizView from './QuizView'
import DeckView from './DeckView'
import NewQuestionView from './NewQuestionView'
import { green, white, gray } from '../utils/colors'

export const Tabs = TabNavigator(
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

export const MainNav = StackNavigator({
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
