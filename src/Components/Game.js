import React from "react";
import {useField, useTextarea} from "./misc/valueFieldHook";
import NumberGame from "./NumberGame";
import WordGame from "./WordGame";

export function Game(props) {
  const [value, input] = useField({defaultValue: props.numberOfBalls, type: 'number', max: '5', min: "1"});
  const [valueT, inputT] = useTextarea({defaultValue: 'Dog Cat Book Mom Dad Friend', cols: 30, rows: 2});
  return (
    <div className={'main-container'}>
      Enter words (max 5 digits):{inputT}
      {
        (props.type === 'numbers') ? <NumberGame content={valueT} numberOfBalls={value || 1}/> :
          <WordGame content={valueT} numberOfBalls={value || 1}/>
      }
    </div>
  )
}
