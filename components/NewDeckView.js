import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Text, TextInput, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { green, white, blue, lightblue, gray } from '../utils/colors'
import * as actions from '../actions'
import { saveDeckTitle } from '../utils/api'

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
  width: 160px;
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
    backgroundColor: white,
    padding: 10,
    fontSize: 16,
  },
})

class DeckListView extends Component {
  state = {
    text: '',
  }

  submitDeck() {
    const { text } = this.state

    if (text === '') {
      // prevents the users from create an empty title deck
      alert('Please fill the deck name')
    } else {
      // updates DB
      saveDeckTitle(text.replace(/\s/g, ''))
      // updates redux
      this.props.addDeck(text)
      // navigates back to the NewDeckView View
      this.props.navigation.navigate('Deck', { title: text })
      // clears the imput once you click the button
      this.setState({ text: '' })
    }
  }

  render() {
    return (
      <NewDeck behavior="padding">
        <Text style={{ fontSize: 24, color: green }}>What is the title of your new deck?</Text>

        <TextInput
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

const mapStateToProps = decks => ({ decks })

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
