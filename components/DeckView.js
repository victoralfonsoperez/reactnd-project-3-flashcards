import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title,
    }
  }

  render() {
    const { title, questions } = this.props.navigation.state.params

    return (
      <View>
        <Text>
          {title}
        </Text>
        <Text>
          {
            questions && questions.map(item => (
              <View>
                <Text>
                  item.question
                </Text>
                <Text>
                  item.answer
                </Text>
              </View>
            ))
          }
        </Text>
      </View>
    )
  }
}

DeckView.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default DeckView
