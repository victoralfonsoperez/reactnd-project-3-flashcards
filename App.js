import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import styled from 'styled-components/native'
import reducer from './reducers'
import setNotification from './utils/helpers'
import { blue } from './utils/colors'
import { MainNav } from './components/Navigator'

const CustomStatusBar = styled.View`
  backgroundColor: ${blue};
  height: ${Constants.statusBarHeight};
`

const FlashCardsStatusBar = () => (
  <CustomStatusBar>
    <StatusBar translucent barStyle="light-content" />
  </CustomStatusBar>
)

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
