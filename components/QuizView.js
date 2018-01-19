import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'
import { green, white, blue, lightblue, gray, black, red } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    padding: 40,
    shadowColor: lightblue,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    width: 250,
  },
  front: {
    backfaceVisibility: 'hidden',
    flex: 1,
  },
  back: {
    position: 'absolute',
    top: 40,
  },
  text: {
    fontSize: 20,
  },
})

const QuizContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: space-between;
  padding: 20px 40px 20px 40px;
`

const ResultsContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 20px 40px 20px 40px;
`
const QuestionNumber = styled.Text`
  align-self: flex-start;
  color: ${black};
  font-size: 16px;
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

const Repeat = styled.TouchableOpacity`
  align-items: center;    
  background-color: ${green};
  border-radius: 50px;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  width: 160px;
`

const Back = styled.TouchableOpacity`
  align-items: center;    
  background-color: ${blue};
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

  state = {
    questionNumber: 0,
    correct: 0,
    incorrect: 0,
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners()
  }

  onAnswerSelected = (answer) => {
    const { questionNumber } = this.state
    const { title } = this.props.navigation.state.params
    const { decks } = this.props
    const valid = decks[title].questions[questionNumber].correct

    if (valid.toLowerCase() === answer.toLowerCase()) {
      this.setState({ correct: this.state.correct + 1 })
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 })
    }

    this.setState({ questionNumber: this.state.questionNumber + 1 })
  }

  retryQuiz() {
    this.setState({ questionNumber: 0, correct: 0, incorrect: 0 })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start()
    }
  }

  render() {
    const { title } = this.props.navigation.state.params
    const { questionNumber, correct } = this.state
    const { decks } = this.props

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate },
      ],
    }

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate },
      ],
    }

    return (
      <QuizContainer>
        {
        questionNumber !== decks[title].questions.length &&
        <View>
          <QuestionNumber>{`${questionNumber + 1}/${decks[title].questions.length}`}</QuestionNumber>
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
              <Animated.View style={[styles.front, frontAnimatedStyle]}>
                <Text style={styles.text}>{decks[title].questions[questionNumber].question}</Text>
              </Animated.View>
              <Animated.View style={[styles.front, styles.back, backAnimatedStyle]}>
                <Text style={styles.text}>{decks[title].questions[questionNumber].answer}</Text>
              </Animated.View>
            </View>

            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.flipCard()}>
              <Text style={{ color: red, fontSize: 16 }}>Answer</Text>
            </TouchableOpacity>

            <View>
              <Correct onPress={() => this.onAnswerSelected('true')}>
                <Text style={{ color: white, fontSize: 16 }}>Correct</Text>
              </Correct>
              <Incorrect onPress={() => this.onAnswerSelected('false')}>
                <Text style={{ color: white, fontSize: 16 }}>Incorrect</Text>
              </Incorrect>
            </View>
          </View>
        </View>
      }
        {
        questionNumber === decks[title].questions.length &&
        <ResultsContainer>
          <Text style={{ fontSize: 24, padding: 10, color: black }}>You have got</Text>
          <Text style={{ fontSize: 30, padding: 10, color: blue }}>{`${(correct * 100) / decks[title].questions.length}%`}</Text>
          <Text style={{ fontSize: 24, padding: 10, color: black }}>Correct answers</Text>

          <Repeat onPress={() => this.retryQuiz()}>
            <Text style={{ color: white, fontSize: 20 }}>Try Again</Text>
          </Repeat>

          <Back onPress={() => this.props.navigation.goBack()}>
            <Text style={{ color: white, fontSize: 20 }}>Go Back</Text>
          </Back>
        </ResultsContainer>
      }
      </QuizContainer>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks,
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

QuizView.propTypes = {
  navigation: PropTypes.object.isRequired,
  decks: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView)
