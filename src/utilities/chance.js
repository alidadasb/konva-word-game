export class Chance {
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

}