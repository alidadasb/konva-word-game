export class Chance {
  static makeNumber({min, max}) {
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
  }

  static makeNumbers({min, max, count, threshold, name}) {
    let list = []
    let val = Chance.makeNumber({min, max})
    let oldval = val

    while (list.length < count) {
      if (Math.abs((val - oldval) / oldval) < threshold) {
      }
      list.push(val)
      oldval = val

      val = Chance.makeNumber({min, max})
    }

    return list
  }

  static roll(percentage) {
    let number = Math.floor((Math.random() * 100)) + 1;

    return number <= percentage;
  }

  static flipCoin() {
    return Math.floor((Math.random() * 2)) === 1
  }

  static choose(list) {
    let number = Math.floor((Math.random() * list.length));

    return list[number];
  }

  static chooseRandom(count, list, filter) {
    let newList = new Set();
    while (newList.size <= count) {
      let value = Chance.choose(list);
      if (!newList.has(value)) {
        if (filter) {
          if (filter(value)) {
            newList.add(value);
          }
        } else {
          newList.add(value);
        }
      }
    }

    return [...newList];
  }
}
