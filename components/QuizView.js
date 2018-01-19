import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

  onAnswerSelected = (answer) => {
    const { questionNumber } = this.state
    const { title } = this.props.navigation.state.params
    const { decks } = this.props
    const valid = decks[title].questions[questionNumber].correct

    valid === answer ?
      this.setState({ correct: this.state.correct + 1 })
      :
      this.setState({ correct: this.state.incorrect + 1 })

    this.setState({ questionNumber: this.state.questionNumber + 1 })
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
        this.state.questionNumber !== this.props.decks[title].questions.length &&
        <View>
          <QuestionNumber>2/2</QuestionNumber>
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
              <Animated.View style={[styles.front, frontAnimatedStyle]}>
                <Text style={styles.text}>Does react native work with android</Text>
              </Animated.View>
              <Animated.View style={[styles.front, styles.back, backAnimatedStyle]}>
                <Text style={styles.text}>Yes it does</Text>
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
        this.state.questionNumber === this.props.decks[title].questions.length &&
        <View>
          <Text>{this.state.questionNumber}</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizView)
