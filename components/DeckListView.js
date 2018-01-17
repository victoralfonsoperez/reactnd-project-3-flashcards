import React, { Component } from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { white, gray, lightblue, darkgreen, black } from '../utils/colors'
import { getDecks } from '../utils/helpers'
import { fetchDecks } from '../actions'

const styles = StyleSheet.create({
  deck: {
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: gray,
    backgroundColor: white,
    borderRadius: 10,
    height: 120,
    justifyContent: 'center',
    margin: 5,
    paddingTop: 40,
    paddingBottom: 40,
    shadowColor: lightblue,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  deckTitle: {
    color: black,
    fontSize: 24,
  },
  deckCardNumber: {
    fontSize: 18,
    color: darkgreen,
  },
})

const DeckContainer = styled.FlatList`
  flex: 1;
  padding: 0 0 40px 0;
  background-color: ${gray};
`

const ErrorText = styled.Text`
  flex: 1;
  padding: 40px;
  text-align: center;
  font-size: 24px;
  color: ${lightblue};
`

class DeckListView extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then(result => JSON.parse(result))
      .then(result => dispatch(fetchDecks(result)))
      .then(() => this.setState({ ready: true }))
      .catch(error => console.warn('error getting the data from the DB', error))
  }

  renderDeck = ({ item }) => (
    <TouchableOpacity
      key={item.title}
      onPress={() => this.props.navigation.navigate(
          'DeckView',
          { deck: item },
        )}
    >
      <View style={styles.deck}>
        <Text style={styles.deckTitle}>{item.title.toUpperCase()}</Text>
        <Text style={styles.deckCardNumber}>
          {`${item.questions && item.questions.length} ${item.questions.length === 1 ? 'CARD' : 'CARDS'}`}
        </Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    const { decks } = this.props
    const listDecks = typeof decks === 'object' && Object.keys(decks).map((key) => {
      const { title, questions } = decks[key]
      return {
        title,
        questions,
        key: title,
      }
    })

    return (
      <View style={{ flex: 1 }}>
        {
          !this.state.ready &&
          <ActivityIndicator style={{ marginTop: 35 }} />
        }
        {
          this.state.ready && listDecks.length === 0 &&
          <ErrorText>THERE ARE NO DECKS YET, CREATE ONE!</ErrorText>
        }
        {
          this.state.ready && listDecks.length !== 0 &&
          <View style={{ flex: 1 }}>
            <DeckContainer
              data={listDecks}
              renderItem={this.renderDeck}
            />
          </View>
      }
      </View>
    )
  }
}

DeckListView.propTypes = {
  decks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(DeckListView)
