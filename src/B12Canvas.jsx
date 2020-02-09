import React, {Component} from 'react';
import {Group, Layer, Stage} from 'react-konva';
import Konva from 'konva';
import PropTypes from 'prop-types'


class B12Canvas extends Component {

    handleDragStart = e => {
        e.target.setAttrs({
            shadowOffset: {
                x: 0.5,
                y: 0.5
            },
            // scaleX: 1.1,
            // scaleY: 1.1
        });
    };

    handleDragEnd = e => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            // scaleX: 1,
            // scaleY: 1,
            shadowOffsetX: 0.5,
            shadowOffsetY: 0.5
        });

        console.log(e.target);
    };

    render() {
        return (
            <div>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {this.props.shapes.map((shape, index) => {
                            return React.cloneElement(
                                shape,
                                {
                                    key: index,
                                    draggable: true,
                                    onDragStart: this.handleDragStart,
                                    onDragEnd: this.handleDragEnd
                                }
                            );
                        })}
                            </Layer>
                            </Stage>
                            </div>
                            );
                            }
                            }

                            B12Canvas.propTypes = {
                            shapes: PropTypes.array
                            };

                            export default B12Canvas;
