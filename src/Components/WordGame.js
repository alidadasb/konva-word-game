import React from "react";
import Canvas from "./canvas/Canvas";
import {Utility} from "../utilities/utility";

export default function WordGame(props) {
    const list = Utility.makeId(props.numberOfBalls).split('');

    return (<Canvas list={list} version={new Date()}/>)
};

