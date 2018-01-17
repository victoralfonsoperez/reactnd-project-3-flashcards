import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Text, TextInput, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { green, white, blue, lightblue, gray } from '../utils/colors'
import * as actions from '../actions'
import { saveDeckTitle } from '../utils/helpers'

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

const styles = StyleSheet.create({
  input: {
    height: 40,
    alignSelf: 'stretch',
    borderColor: Platform.OS === 'ios' ? blue : 'transparent',
    borderWidth: Platform.OS === 'ios' ? 2 : 0,
    borderRadius: Platform.OS === 'ios' ? 6 : 0,
    marginTop: 20,
    color: lightblue,
    padding: 10,
    fontSize: 16,
  },
})

class DeckListView extends Component {
  state ={
    text: '',
  }

  submitDeck() {
    const { text } = this.state

    if (text === '') {
      alert('Please fill the deck name')
    } else {
      const deck = {
        title: text,
        questions: [],
      }
      // clears the imput once you click the button
      this._textInput.setNativeProps({ text: '' })
      // updates DB
      saveDeckTitle(text.replace(/\s/g, ''), deck)
      // updates redux
      this.props.addDeck(deck)
      // navigates back to the previous page
      this.props.navigation.goBack()

      this.props.navigation.navigate(
        'DeckView',
        { deck },
      )
    }
  }

  render() {
    return (
      <NewDeck behavior="padding">
        <Text style={{ fontSize: 24, color: green }}>What is the title of your new deck?</Text>

        <TextInput
          ref={component => this._textInput = component}
          style={styles.input}
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

DeckListView.propTypes = {
  navigation: PropTypes.object.isRequired,
  addDeck: PropTypes.func.isRequired,
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
