import React from 'react';
import './App.css';
import B12Canvas from "./B12Canvas";
import {ShapeBuilder} from "./shapeBuilder";


function App() {
    let shapes = ShapeBuilder.createGroups(10);
    return (
        <div className="App">
            <B12Canvas shapes={shapes}/>
        </div>
    );
}

export default App;
