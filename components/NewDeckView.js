import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Text, TextInput, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { green, white, blue, lightblue, gray } from '../utils/colors'
import * as actions from '../actions'
import { saveDeckTitle, getDecks } from '../utils/helpers'

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
  state ={
    text: '',
  }

  submitDeck() {
    const { text } = this.state
    //removes whitespaces
    const obj = {
      title: text.replace(/\s/g, ''),
      questions: [],
    }
    //clears the imput once you click the button
    this._textInput.setNativeProps({ text: '' })
    //updates DB
    saveDeckTitle(text, obj)
    //updates redux
    this.props.addDeck(obj)
    //navigates back to the previous page
    this.props.navigation.goBack()
  }

  render() {
    return (
      <NewDeck behavior="padding">
        <Text style={{ fontSize: 24, color: green }}>What is the title of your new deck?</Text>

        <TextInput
          ref={component => this._textInput = component}
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
          autoFocus
          placeholderTextColor={gray}
          placeholder="Deck Title"
          onChangeText={text => this.setState({ text })}
        />

        <SubmitBtn
          onPress={() => this.submitDeck()}
        >
          <Text style={{ color: white }}>SUBMIT</Text>
        </SubmitBtn>
      </NewDeck>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
