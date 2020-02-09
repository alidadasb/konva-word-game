import React, {Component} from 'react';
import Konva from "konva";
import {Utility} from "../utilities/utility";
import {Chance} from "../utilities/chance";
import './canvas.css'

class Canvas extends Component {
    constructor(props) {
        super(props);
    }

    handleDragStart = e => {
        e.target.setAttrs({
            shadowOffset: {
                x: 0.5,
                y: 0.5
            },
        });
    };

    handleDragEnd = e => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            shadowOffsetX: 0.5,
            shadowOffsetY: 0.5
        });

        console.log(e.target);
    };

    createState() {
        return new Konva.Stage({
            container: 'container',
            width: 750,
            height: 500,
        });

    }



    componentWillMount() {

    }

    componentDidMount() {
        this.stage = this.createState();
        this.layer = new Konva.Layer();

        this.setupCanvas();
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'container'} id={'container'}>

            </div>
        );
    }

    attachEvents(shape) {
        shape.draggable(true);
        shape.on('dragstart', this.handleDragStart);
        shape.on('dragend', this.handleDragEnd);
    }

    buildShapes = (options) => {
        const text = this.buildText();
        text.offsetX(text.width() / 2);
        text.offsetY(text.height() / 2);
        const circle = this.buildCircle(text);

        const group = new Konva.Group({
            draggable: true,
            x: Chance.choose(options.xs),
            y: Chance.choose(options.ys)

        });

        group.add(circle);
        group.add(text);

        this.attachEvents(group);

        return group;
    };

    buildText(container) {
        return new Konva.Text({
            align: 'center',
            text: 'ABC',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'green'
        })
    }

    buildCircle() {
        return new Konva.Circle({
            x: 0,
            y: 0,
            radius: 70,
            fill: Konva.Util.getRandomColor(),
            stroke: 'black',
            strokeWidth: 4
        });
    }

    setupCanvas() {
        let shapes = Utility.generateList(3, this.buildShapes, {
            xs: Utility.generateList(10, Utility.makeNumber, {min: 50, max: this.stage.x() + this.stage.width() - 50}),
            ys: Utility.generateList(10, Utility.makeNumber, {min: 50, max: this.stage.y() + this.stage.height() - 50})
        });

        this.layer.add(...shapes);
        this.stage.add(this.layer);
        this.layer.draw();
    }
}

Canvas.propTypes = {};

export default Canvas;