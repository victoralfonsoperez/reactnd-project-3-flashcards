import React, { Component } from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import { white, gray, lightblue, darkgreen, blue } from '../utils/colors'
import { setDecks } from '../utils/helpers'

const DeckContainer = styled.FlatList`
  flex: 1;
  padding: 20px 0 40px 0;
  background-color: ${gray};
  border: 2px solid ${blue};
`

const Deck = styled.View`
  align-items: center;  
  flex: 1;
  background-color: ${white};
  border: 1px solid ${gray};
  border-radius: 10px;
  height: 120px;
  justify-content: center;
  margin: 5px;
  padding: 40px 0;
  shadow-color: ${lightblue};
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3;
`

const DeckTitle = styled.Text`
  color: #000;
  font-size: 24px;
`

const DeckCardsNumber = styled.Text`
  font-size: 18px;
  color: ${darkgreen};
`

class DeckListView extends Component {
  renderDeck = ({ item }) => (
    <TouchableOpacity>
      <Deck key={item.key}>
        <DeckTitle>{item.title.toUpperCase()}</DeckTitle>
        <DeckCardsNumber>
          {`${item.questions.length} ${item.questions.length === 1 ? 'CARD' : 'CARDS'}`}
        </DeckCardsNumber>
      </Deck>
    </TouchableOpacity>
  )

  render() {
    const { decks } = this.props
    const listDecks = Object.keys(decks).map((key) => {
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
          <View style={{ flex: 1, borderWidth: 2, borderColor: 'black' }}>
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
