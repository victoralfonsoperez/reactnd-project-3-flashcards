import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import { white, blue, lightblue, black } from '../utils/colors'

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
    const { title } = navigation.state.params

    return {
      title,
    }
  }

  state = {
    addCard: 'Add Card',
    startQuiz: 'Start Quiz',
  }

  render() {
    const { title } = this.props.navigation.state.params
    const { decks } = this.props
    const { addCard, startQuiz } = this.state
    const { questions } = decks[title]

    return (
      <DeckContainer>
        <DeckTitle>
          {title}
        </DeckTitle>
        <DeckCardsAmount>
          <Text>{`${questions && questions.length} cards`}</Text>
        </DeckCardsAmount>

        <AddCard onPress={() => this.props.navigation.navigate('AddQuestion', { addCard, title })}>
          <Text style={{ color: blue, fontSize: 18 }}>{addCard}</Text>
        </AddCard>

        {
          questions && questions.length !== 0 &&
          <StartQuiz onPress={() => this.props.navigation.navigate('Quiz', { title })}>
            <Text style={{ color: white, fontSize: 18 }}>{startQuiz}</Text>
          </StartQuiz>
        }

      </DeckContainer>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  }
}

DeckView.propTypes = {
  navigation: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(DeckView)
