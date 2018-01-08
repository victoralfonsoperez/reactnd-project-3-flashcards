import React, { Component } from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { white, gray, lightblue, darkgreen, blue, black } from '../utils/colors'
import { setDecks, getDecks } from '../utils/helpers'
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
  padding: 20px 0 40px 0;
  background-color: ${gray};
`

function Item({ title, questions }) {
  return (
    <TouchableOpacity key={title}>
      <View style={styles.deck}>
        <Text style={styles.deckTitle}>{title.toUpperCase()}</Text>
        <Text style={styles.deckCardNumber}>
          {`${questions.length} ${questions.length === 1 ? 'CARD' : 'CARDS'}`}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

class DeckListView extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then(result => JSON.parse(result))
      .then(result => dispatch(fetchDecks(result)))
  }

  renderDeck = ({ item }) => (
    <Item {...item} />
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
        listDecks.length !== 0 &&
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
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(DeckListView)
