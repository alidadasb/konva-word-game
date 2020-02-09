import {Utility} from "./utilities/utility";
import {Chance} from "./utilities/chance";
import React from "react";
import {Circle, Group, Text} from "react-konva";

export class ShapeBuilder {
    static createCircle(chanceSeed) {
        let colors = Utility.generateList(chanceSeed, Utility.getRandomColor, null);

        return <Circle
            x={0}
            y={0}
            fill={Chance.choose(colors)}
            radius={50}
        />
    }

    static createCircles(number) {
        return Utility.generateList(number, ShapeBuilder.createCircle, 10);
    }

    static createGroup(options) {
        return <Group
            x={Chance.choose(options.xs)}
            y={Chance.choose(options.ys)}
            border={1}
        >
            {ShapeBuilder.createCircle(10)}
            {ShapeBuilder.createText()}
        </Group>
    }

    static createText() {
        return <Text
            x={1}
            y={1}
            text={'ABC'}
            fontSize={30}
            fontFamily={'Calibri'}
            fill={'green'}
        />
    }

    static createGroups() {
        return Utility.generateList(3, ShapeBuilder.createGroup, {
            xs: Utility.generateListRecursiveArg(10, (x) => x + 55, 10),
            ys: Utility.generateListRecursiveArg(10, (x) => x + 55, 10)
        })
    }
}

