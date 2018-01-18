import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { green, white, blue, lightblue, gray, black, red } from '../utils/colors'

const QuizContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: space-between;
  padding: 20px 40px 20px 40px;
`

const QuestionNumber = styled.Text`
  align-self: flex-start;
  color: ${black};
  font-size: 16px;
`

const Question = styled.Text`
  color: ${black};
  font-size: 28px;
  margin-bottom: 20px;
`

const Correct = styled.TouchableOpacity`
  align-items: center;    
  background-color: ${green};
  border-radius: 50px;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  width: 160px;
`

const Incorrect = styled.TouchableOpacity`
  align-items: center;    
  background-color: ${red};
  border-radius: 50px;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  width: 160px;
`

class QuizView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title,
    }
  }

  render() {
    return (
      <QuizContainer>
        <QuestionNumber>2/2</QuestionNumber>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Question>Does react native work with android</Question>
          <TouchableOpacity>
            <Text style={{ color: red, fontSize: 16 }}>Answer</Text>
          </TouchableOpacity>

          <View>
            <Correct>
              <Text style={{ color: white, fontSize: 16 }}>Correct</Text>
            </Correct>
            <Incorrect>
              <Text style={{ color: white, fontSize: 16 }}>Incorrect</Text>
            </Incorrect>
          </View>
        </View>
      </QuizContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizView)
