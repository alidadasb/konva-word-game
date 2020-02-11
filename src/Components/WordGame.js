import React, {useState} from "react";
import Canvas from "./canvas/Canvas";
import {Utility} from "../utilities/utility";
import {Chance} from '../utilities/chance'

export default function WordGame(props) {
  const generateNewWord = () => {
    let word = props.content ? Chance.choose(props.content.split(" ")) : Utility.makeId(props.numberOfBalls)

    word = word.substring(0, Math.min(props.numberOfBalls, word.length))
    return word.split('');
  }

  const [chars, setWord] = useState(generateNewWord())


  return (<div>
    <button onClick={() => {
      setWord(generateNewWord)
    }
    }>New Word
    </button>
    <Canvas list={chars} version={new Date()}/>
  </div>)
};

