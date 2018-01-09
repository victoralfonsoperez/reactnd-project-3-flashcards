import React, { Component } from 'react'
import { View, Text } from 'react-native'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: title
    }
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.navigation.state.params.title}
        </Text>
        <Text>
          {
            this.props.navigation.state.params.questions && this.props.navigation.state.params.questions.map(question => (
              <View>
                <Text>
                  question.question
                </Text>
                <Text>
                  question.answer
                </Text>
              </View>
            ))
          }
        </Text>
      </View>
    )
  }
}

export default DeckView
