import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Text, TextInput, Platform } from 'react-native'
import { green, white, blue, lightblue } from '../utils/colors'

const NewDeck = styled.KeyboardAvoidingView`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 20px 40px 20px 40px;
`

const SubmitBtn = styled.TouchableOpacity`
  align-items: center;    
  background-color: ${green};
  border-radius: 50px;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  width: 120px;
`

class DeckListView extends Component {
  state = {}

  render() {
    return (
      <NewDeck behavior="padding">
        <Text style={{ fontSize: 24, color: green }}>What is the title of your new deck?</Text>

        <TextInput
          style={
            {
              height: 40,
              alignSelf: 'stretch',
              borderColor: Platform.OS === 'ios' ? blue : 'transparent',
              borderWidth: Platform.OS === 'ios' ? 2 : 0,
              borderRadius: Platform.OS === 'ios' ? 6 : 0,
              marginTop: 20,
              color: lightblue,
              padding: 10,
              fontSize: 16,
            }}
          onChangeText={text => this.setState({ text })}
        />

        <SubmitBtn
          onPress={() => alert('Button pressed!')}
        >
          <Text style={{ color: white }}>SUBMIT</Text>
        </SubmitBtn>

        <Text>{this.state.text}</Text>
      </NewDeck>
    )
  }
}

export default DeckListView
