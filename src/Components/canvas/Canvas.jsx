import React, {Component} from 'react';
import Konva from "konva";
import {Utility} from "../../utilities/utility";
import './canvas.css'
import {CanvasUtil} from "../../utilities/CanvasUtil";
import invert from 'invert-color'
import {Chance} from '../../utilities/chance'
import GroupByMap from '../../utilities/group-by-map'

const STATE_WIDTH = 800;
const STAGE_HEIGHT = 700;
const RADIUS = 70;
const HEADER_HEIGHT = 300;
const OFFSET_1 = 10;
const NUMBER_OF_STARS = 20;


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      version: props.version,
      colors: Utility.generateList(props.list.length, Konva.Util.getRandomColor)
    }
  }

  handleDragStart = e => {
    e.target.setAttrs({
      data: {
        dragStartPos: {
          x: e.target.x(),
          y: e.target.y()
        }
      },
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

    this.snapToObject(e)
    e.target.attrs.data.dragStartPos = null
  };

  objectDetection = (e) => {
    const targetRect = e.target.getClientRect();
    let nodeConfigNodes = this.layer.find('.headerCircleShape')

    nodeConfigNodes.each((headerCircle) => {
      if (Canvas.haveIntersection(headerCircle.getClientRect(), targetRect, 0.7)) {
        headerCircle.fill('red');
      } else {
        headerCircle.fill('white');
      }
    })
  };

  objectSnapped(target, headerCircle) {
    this.gameMap.removeByKey(target.id())

    setTimeout(function () {
      target.draggable(false)
    }, 50);
    Utility.beepSnapped()

    if (this.checkWin()) {
      this.winGame()
    }
  }

  checkWin() {
    return !this.gameMap.size()
  }

  objectFailedToSnap() {
    Utility.beepFailedSnap()
  }

  winGame() {
    this.addStars()
  }

  gameOver() {
    console.log('gameOver')
    const sizeW = 200
    const sizeH = 200


    const group = new Konva.Group({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
      scaleX: 1,
      scaleY: 1,
      draggable: false,
      rotation: 0
    })

    this.layer.add(group);
    const box = new Konva.Rect({
      width: sizeW,
      height: sizeH,
      fill: 'black',
      offsetX: sizeW / 2,
      offsetY: (sizeH / 2) ,
      cornerRadius: 5,
      shadowBlur: 10,
      shadowColor: 'grey'
    });

    const text = this.buildText({
      text: 'Game Over',
      x: -sizeW / 2,
      width: sizeW,
      // height: box.height(),
      align: 'center',
      verticalAlign: 'top',
      fill: 'white',
      fontSize: 50,
      // offsetX: sizeW / 2,
      offsetY: (sizeH / 2)
    })

    const text1 = this.buildText({
      text: 'New Word',
      x: -sizeW / 2,
      width: sizeW,
      height: box.height(),
      align: 'center',
      verticalAlign: 'bottom',
      fill: 'yellow',
      fontSize: 18,
      // offsetX: sizeW / 2,
      offsetY: (sizeH / 2) + 18,
      listening: false
    })

    const box1 = new Konva.Rect({
      fill: 'gray',
      width: sizeW/ 2,
      height: 25,
      offsetX: sizeW / 4 ,
      offsetY: (-sizeH / 2) + 40,
      cornerRadius: 5,
      shadowBlur: 10,
      shadowColor: 'black'
    }).on('mouseover', ()=> {
      box1.shadowColor('gray')
      this.layer.draw()
    }).on('mouseleave', ()=> {
      box1.shadowColor('black')
      this.layer.draw()
    }).on('click', ()=> {
      box1.scaleX(1.1)
      this.layer.draw();

      this.setupCanvas()
    })

    group.add(box, text, box1, text1)
    this.layer.draw()
  }

  starAnimationFinished() {
    console.log('starAnimationFinished')
  }

  snapToObject = (e) => {
    const targetRect = e.target.getClientRect();
    let nodeConfigNodes = this.layer.find('.headerCircleShape')

    nodeConfigNodes.each((headerCircle) => {
      if (Canvas.haveIntersection(headerCircle.getClientRect(), targetRect, 0.7)) {
        if (headerCircle.parent.name() === e.target.name()) {
          e.target.x(headerCircle.parent.x())
          e.target.y(headerCircle.parent.y())
          this.objectSnapped(e.target, headerCircle)
        } else {
          e.target.x(e.target.attrs.data.dragStartPos.x)
          e.target.y(e.target.attrs.data.dragStartPos.y)
          this.objectFailedToSnap(e.target, headerCircle)
        }

        headerCircle.fill('white')
      }
    })
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
        version: nextProps.version,
        colors: Utility.generateList(nextProps.list.length, Konva.Util.getRandomColor)
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
    return (
      <div className={'container'} id={'container'}/>
    );
  }

  attachEvents(shape, options) {
    if (options.draggable) {
      shape.draggable(true);
      shape.on('dragstart', this.handleDragStart);
      shape.on('dragend', this.handleDragEnd);
      shape.on('dragmove', this.objectDetection);
    }

  }

  buildShapes = (options, index) => {
    let color = options.colors[index]

    const text = this.buildText({
      text: options.list[index],
      fill: (options.textFontFill === 'invert') ? invert(color) : options.textFontFill,
      fontSize: options.textFontSize || 40,
    });

    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    const circle = this.buildCircle({name: options.name, color: color});

    const group = new Konva.Group({
      x: options.xys.xs[index] || options.xys.xs || 0,
      y: options.xys.ys[index] || options.xys.ys || 0,
      name: 'GroupId',
      id: options.list[index]
    });
    group.addName(options.list[index])
    group.add(circle);
    group.add(text);

    this.attachEvents(group, options);

    return group;
  };

  buildText(options) {
    return new Konva.Text({
      ...options,
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
      strokeWidth: 4,
      name: options.name
    });
  }

  createSeparator() {
    return new Konva.Rect({
      x:this.stage.x(),
      y:this.stage.y(),
      width: this.stage.width(),
      height: HEADER_HEIGHT - RADIUS,
      stroke: 'red',
      fill: 'lightgray',
      tension: 1
    })
  }

  setupCanvas() {
    this.layer.destroyChildren();
    let count = this.state.list.length;
    let shapes = Utility.generateList(count, this.buildShapes, {
      list: this.state.list,
      draggable: true,
      xys: CanvasUtil.randomCoordsWithinBorder(count, this.stage, {left: RADIUS, top: HEADER_HEIGHT, bottom: RADIUS}),
      colors: this.state.colors,
      textFontFill: 'invert'
    });
    this.gameMap = new GroupByMap()
    this.starCounter = 0
    this.layer.add(...this.setupHeader());
    shapes.forEach((shape) => {
      this.gameMap.add(shape.id(), shape)
      this.layer.add(shape)
    })
    this.layer.draw();
  }

  setupHeader() {
    let count = this.state.list.length;

    let shapes = Utility.generateList(count, this.buildShapes, {
      list: this.state.list,
      colors: [],
      textFontFill: 'black',
      textFontSize: 50,
      name: 'headerCircleShape',
      draggable: false,
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

  static applySizePercentage(point, pct) {
    pct = 1 - pct
    let pnt = {}
    pnt.x = point.x + (point.x * pct)
    pnt.y = point.y + (point.y * pct)
    pnt.width = point.width - (point.width * pct)
    pnt.height = point.height - (point.height * pct)
    return pnt
  }

  static
  haveIntersection = (r1, r2, percent = 1) => {
    r2 = Canvas.applySizePercentage(r2, percent)
    r1 = Canvas.applySizePercentage(r1, percent)
    return !(
      (r2.x) > r1.x + r1.width ||
      (r2.x + r2.width) < r1.x ||
      (r2.y) > r1.y + r1.height ||
      (r2.y + r2.height) < r1.y
    );
  }

  addStars() {
    setTimeout(() => {
      this.gameOver()
    }, 500)

    for (let n = 0; n < NUMBER_OF_STARS; n++) {
      let star = this.createStar();
      this.layer.add(star);

      setTimeout(() => {
        let anim = new Konva.Animation((frame) => {
          const dist = Chance.makeNumber({min: 50, max: 100}) * (frame.timeDiff / 1000)

          star.move({y: dist})
          if (star.y() > this.stage.height()) {
            anim.stop()
            this.starCounter++

            if (this.starCounter === NUMBER_OF_STARS) {
              this.starAnimationFinished()
            }
          }
        }, this.layer).start()
      }, 1)
    }
  }

  createStar() {
    const scale = Math.random()

    return new Konva.Star({
      x: Math.random() * this.stage.width(),
      y: Math.random() * this.stage.height(),
      numPoints: 5,
      innerRadius: 30,
      outerRadius: 50,
      fill: Utility.getRandomColor(),
      opacity: 0.8,
      draggable: false,
      scale: {
        x: scale,
        y: scale
      },
      rotation: Math.random() * 180,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: {
        x: 5,
        y: 5
      },
      shadowOpacity: 0.6,
      startScale: scale,
      name: 'stars'
    })
  }
}

Canvas.propTypes = {};

export default Canvas;
