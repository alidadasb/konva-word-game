import React from "react";
import {useField} from "./misc/valueFieldHook";
import NumberGame from "./NumberGame";
import WordGame from "./WordGame";

export function Game(props) {
    const [value, input] = useField({defaultValue: props.numberOfBalls});
    return (
        <div className={'main-container'}>
            Balls#: {input}
            {
                (props.type === 'numbers') ? <NumberGame numberOfBalls={value}/> : <WordGame numberOfBalls={value}/>
            }
        </div>
    )
}