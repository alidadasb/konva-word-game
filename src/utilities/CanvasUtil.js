import {Chance} from "./chance";

export class CanvasUtil {
  static randomCoordsWithinBorder(count, stage, offset) {
    let topOffset = offset ? offset.top : 0;
    let leftOffset = offset ? offset.left : 0;
    let bottomOffset = offset ? offset.bottom : 0;

    console.log('stage.y() + stage.height()', topOffset, stage.y(), stage.height())
    let ys = Chance.makeNumbers({
      min: stage.y() + topOffset,
      max: stage.y() + stage.height() - bottomOffset,
      count,
      name: 'y'
    })
    let xs = Chance.makeNumbers({
      min: stage.x() + leftOffset,
      max: stage.x() + stage.width() - leftOffset,
      count,
      name: 'x'
    })

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
