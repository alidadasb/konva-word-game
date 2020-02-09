import React from 'react';
import './App.css';
import {ShapeBuilder} from "./shapeBuilder";
import Canvas from "./canvas/Canvas";


function App() {
    let shapes = ShapeBuilder.createGroups(10);
    return (
        <div className="App">
            {/*<B12Canvas shapes={shapes}/>*/}
            <Canvas />
        </div>
    );
}

export default App;
