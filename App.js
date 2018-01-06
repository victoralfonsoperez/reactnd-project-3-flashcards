import React, { Component } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
`

class App extends Component {
  state = {
    name: 'test',
  }

  render() {
    const { name } = this.state

    return (
      <Container>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>{name}</Text>
      </Container>
    )
  }
}

export default App
