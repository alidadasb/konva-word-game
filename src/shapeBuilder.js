import {Utility} from "./utilities/utility";
import {Chance} from "./utilities/chance";
import React from "react";
import {Circle, Group, Text} from "react-konva";

export class ShapeBuilder {
    static createCircle(chanceSeed) {
        let colors = Utility.generateList(chanceSeed, Utility.getRandomColor, null);

        return <Circle
            x={100}
            y={100}
            fill={Chance.choose(colors)}
            radius={50}
        />
    }

    static createCircles(number) {
        return Utility.generateList(number, ShapeBuilder.createCircle, 10);
    }

    static createGroup(chanceSeed) {
        let xs = Utility.generateListRecursiveArg(chanceSeed, (x) => x + 55, 10);
        let ys = Utility.generateListRecursiveArg(chanceSeed, (x) => x + 55, 10);
        return <Group
            x={Chance.choose(xs)}
            y={Chance.choose(ys)}
        >
           { ShapeBuilder.createCircle(10)}
        </Group>
    }

    static createText() {
        return <Text
            x={1}
            y={1}
            text={'Simple Text'}
            fontSize={30}
            fontFamily={'Calibri'}
            fill={'green'}
        />
            }

            static createGroups() {


            return Utility.generateList(10, ShapeBuilder.createGroup)

            // return [circle]

        }
            }

