export class Utility {
    static makeId(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static makeNumber({min, max}) {
        return Math.floor(Math.random() * Math.floor(max - min)) + min;
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static generateList(numberOfItems, fnc, args) {
        let list = [];
        for (let i = 0; i < numberOfItems; i++) {
            list.push(fnc(args));
        }
        return list;
    }

    static generateListRecursiveArg(numberOfItems, fnc, args) {
        let list = [];
        let lastVal = args;
        for (let i = 0; i < numberOfItems; i++) {
            lastVal = fnc(lastVal);
            list.push(lastVal);
        }
        return list;
    }
}