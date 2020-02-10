import {Utility} from "./utility";
import {Chance} from "./chance";

export class CanvasUtil {
    static randomCoordsWithinBorder(count, stage, offset) {
        let yOffset = offset ? offset.y : 0;
        let xOffset = offset ? offset.x : 0;

        let ys = Utility.generateList(count, Chance.makeNumber,
            {
                min: stage.y() + yOffset,
                max: stage.y() + stage.height() - yOffset
            });
        let xs = Utility.generateList(count, Chance.makeNumber, {
            min: stage.x() + xOffset,
            max: stage.x() + stage.width() - xOffset
        });

        return {xs, ys}
    }

    static distribute(count, min, max, offset, gap) {
        let aOffset = offset ? offset.a : 0;
        let bOffset = offset ? offset.b : 0;

        let availableSpace = (max - min - aOffset - bOffset) / count;
        let step = Math.max(gap, availableSpace);

        let list = [];
        for (let i = min + aOffset; i <= max - bOffset; i += step) {
            list.push(i);
        }

        return list
    }
}