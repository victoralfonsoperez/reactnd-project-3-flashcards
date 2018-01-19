import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'
import { green, white, blue, lightblue, gray } from '../utils/colors'
import { addCard } from '../utils/api'

const CardContainer = styled.KeyboardAvoidingView`
  align-items: center;
  background-color: ${gray};
  flex: 1;
  justify-content: center;
  padding: 30px;
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
    backgroundColor: white,
    borderColor: Platform.OS === 'ios' ? blue : 'transparent',
    borderWidth: Platform.OS === 'ios' ? 2 : 0,
    borderRadius: Platform.OS === 'ios' ? 6 : 0,
    marginTop: 20,
    color: lightblue,
    padding: 10,
    fontSize: 16,
  },
})

class NewQuestionView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { addCard } = navigation.state.params

    return {
      title: addCard,
    }
  }

  state = {
    question: '',
    answer: '',
    correct: '',
  }

  submitCard(deck) {
    const { question, answer, correct } = this.state

    if (question === '' || answer === '') {
      alert('The fields are required')
    } else {
      // updates DB
      addCard(deck, { question, answer, correct })
      // updates redux
      this.props.addCard({
        question,
        answer,
        correct,
        deck,
      })
      // sets the state to its initial values
      this.setState({ question: '', answer: '', correct: '' })
      // navigates back to the previous page
      this.props.navigation.goBack()
    }
  }

  render() {
    const { title } = this.props.navigation.state.params

    return (
      <CardContainer behavior="padding">
        <TextInput
          style={styles.input}
          placeholderTextColor={gray}
          placeholder="Question"
          onChangeText={question => this.setState({ question })}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor={gray}
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor={gray}
          placeholder="True or false"
          onChangeText={correct => this.setState({ correct })}
        />

        <SubmitBtn
          onPress={() => this.submitCard(title)}
        >
          <Text style={{ color: white }}>SUBMIT</Text>
        </SubmitBtn>
      </CardContainer>
    )
  }
}

NewQuestionView.propTypes = {
  navigation: PropTypes.object.isRequired,
  addCard: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionView)
