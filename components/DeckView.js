import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import { green, white, blue, lightblue, gray, black } from '../utils/colors'

const DeckContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 30px;
`

const DeckTitle = styled.Text`
  color: ${black};
  font-size: 36;
  padding: 20px;
`

const DeckCardsAmount = styled.Text`
  color: ${lightblue};
  font-size: 20;
  margin-bottom: 20px;
`

const AddCard = styled.TouchableOpacity`
  align-items: center;    
  background-color: ${white};
  border-radius: 50px;
  justify-content: center;
  margin: 10px 0;
  padding: 16px;
  width: 160px;
`

const StartQuiz = styled.TouchableOpacity`
  align-items: center;    
  background-color: ${blue};
  border-radius: 50px;
  justify-content: center;
  margin: 10px 0;
  padding: 16px;
  width: 160px;
`

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: deck.title,
    }
  }

  state = {
    addCard: 'Add Card',
    startQuiz: 'Start Quiz',
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const { addCard, startQuiz } = this.state

    return (
      <DeckContainer>
        <DeckTitle>
          {deck.title}
        </DeckTitle>
        <DeckCardsAmount>
          {`${deck.questions.length} cards`}
        </DeckCardsAmount>

        <Text>
          {
            deck.questions && deck.questions.map(item => (
              <View>
                <Text>
                  {item.question}
                </Text>
                <Text>
                  {item.answer}
                </Text>
              </View>
            ))
          }
        </Text>
        <AddCard onPress={() => this.props.navigation.navigate('NewQuestionView', { addCard })}>
          <Text style={{ color: blue, fontSize: 18 }}>{addCard}</Text>
        </AddCard>

        <StartQuiz onPress={() => this.props.navigation.navigate('QuizView', { title: 'Quiz' })}>
          <Text style={{ color: white, fontSize: 18 }}>{startQuiz}</Text>
        </StartQuiz>

      </DeckContainer>
    )
  }
}

DeckView.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default DeckView
