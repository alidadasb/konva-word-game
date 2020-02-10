import React from 'react';
import './App.css';
import {Game} from "./Components/Game";


function App() {
    return (
        <div className="App">
            <Game numberOfBalls={5} type={'word'}/>
        </div>
    );
}

export default App;
