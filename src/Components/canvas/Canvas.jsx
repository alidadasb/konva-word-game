import React, {Component} from 'react';
import Konva from "konva";
import {Utility} from "../../utilities/utility";
import './canvas.css'
import {CanvasUtil} from "../../utilities/CanvasUtil";

const STATE_WIDTH = 800;
const STAGE_HEIGHT = 700;
const RADIUS = 70;
const HEADER_HEIGHT = 300;

const OFFSET_1 = 10;

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.colors = Utility.generateList(props.list.length, Konva.Util.getRandomColor);
        this.state = {
            list: props.list,
            version: props.version
        }
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
            width: STATE_WIDTH,
            height: STAGE_HEIGHT,
        });

    }


    componentWillMount() {
    }

    componentDidMount() {
        this.stage = this.createState();
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        this.setupCanvas();
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.version !== nextState.version) {
            this.setState({
                list: nextProps.list,
                version: nextProps.version
            }, this.setupCanvas);


            return true
        }

        return false;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {
        this.layer.draw();
    }

    componentWillUnmount() {

    }

    render() {
        console.log('canvas updated render');
        return (
            <div className={'container'} id={'container'}/>
        );
    }

    generateGame = () => {

    };

    attachEvents(shape) {
        shape.draggable(true);
        shape.on('dragstart', this.handleDragStart);
        shape.on('dragend', this.handleDragEnd);
    }

    buildShapes = (options, index) => {
        const text = this.buildText({
            text: options.list[index],
            fill: options.textFontFill,
            fontSize: 40
        });

        text.offsetX(text.width() / 2);
        text.offsetY(text.height() / 2);
        const circle = this.buildCircle({color: options.colors[index]});

        const group = new Konva.Group({
            draggable: true,
            x: options.xys.xs[index] || options.xys.xs || 0,
            y: options.xys.ys[index] || options.xys.ys || 0

        });

        group.add(circle);
        group.add(text);

        this.attachEvents(group);

        return group;
    };

    buildText(options) {
        return new Konva.Text({
            align: options.align || 'center',
            text: options.text || 'undefined',
            fontSize: options.fontSize || 30,
            fontFamily: options.fontFamily || 'Calibri',
            fill: options.fill || 'green'
        })
    }

    buildCircle(options) {
        return new Konva.Circle({
            x: 0,
            y: 0,
            radius: RADIUS,
            fill: options.color,
            stroke: 'black',
            strokeWidth: 4
        });
    }

    createSeparator() {
        return new Konva.Line({
            points: [0, HEADER_HEIGHT - RADIUS, 800, HEADER_HEIGHT - RADIUS],
            stroke: 'red',
            tension: 1
        })
    }

    setupCanvas() {
        this.layer.destroyChildren();
        let count = this.state.list.length;
        let shapes = Utility.generateList(count, this.buildShapes, {
            list: this.state.list,
            xys: CanvasUtil.randomCoordsWithinBorder(count, this.stage, {x: RADIUS, y: 300}),
            colors: this.colors,
            textFontFill: 'white'
        });

        this.layer.add(...this.setupHeader());

        this.layer.add(...shapes);
        this.layer.draw();
    }

    setupHeader() {
        let count = this.state.list.length;

        let shapes = Utility.generateList(count, this.buildShapes, {
            list: this.state.list,
            colors: [],
            textFontFill: 'black',
            xys: {
                xs: CanvasUtil.distribute(count, this.stage.x(), this.stage.x() + this.stage.width(), {
                    a: RADIUS + OFFSET_1,
                    b: OFFSET_1
                }, 2 * RADIUS + OFFSET_1),
                ys: RADIUS + OFFSET_1
            },
        });
        return [
            this.createSeparator(),
            ...shapes
        ];
    }
}

Canvas.propTypes = {};

export default Canvas;