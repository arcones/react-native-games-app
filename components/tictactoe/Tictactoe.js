import { View, Text } from 'react-native';

import React, { useState, useEffect, useContext } from 'react';
import Header from './Header.jsx';
import Board from './Board.jsx';
import Reset from './Reset.jsx';
import { styles } from '../Styles.js';
import { LangContext } from '../../App.jsx';

export default function App() {

  const contextValue = useContext(LangContext);

  const PLAYERX = `${contextValue.dictionary.tictactoe_player_turn} 1 - Xs`;
  const PLAYER0 = `${contextValue.dictionary.tictactoe_player_turn} 2 - Os`;

  const [turn, setTurn] = useState(PLAYERX);
  const [moves, setMoves] = useState(0);
  const [values, setValues] = useState([
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://myjson.dit.upm.es/api/bins/ccr5");
      const myjson = await res.json();
      setTurn(myjson.turn);
      setMoves(myjson.moves);
      setValues(myjson.values);
    }

    fetchData();
  }, []);

  function appClick(rowNumber, columnNumber) {
    let valuesCopy = JSON.parse(JSON.stringify(values));
    let newMovement = turn === PLAYERX ? 'X' : '0';
    valuesCopy[rowNumber][columnNumber] = newMovement;
    setTurn(turn === PLAYERX ? PLAYER0 : PLAYERX);
    setValues(valuesCopy);
    setMoves(moves + 1);
  }

  function resetClick() {
    setTurn(PLAYERX);
    setMoves(0);
    setValues([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]);
  }

  return (
    <View style={styles.tictactoeMargin}>
      <Header text={turn} />
      <Board values={values} appClick={appClick} />
      <Text style={styles.tictactoeText}>Number of moves: {moves}</Text>
      <Reset resetClick={resetClick}></Reset>
    </View>
  );


}