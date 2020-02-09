import GroupByMap from "./group-by-map";

export class SumMap extends Map {

    add(key, numberValue) {
        if (!this.has(key)) {
            this.set(key, numberValue);

            return
        }

        let _value = this.get(key);
        this.set(key, _value + numberValue);

    }

    subtract(key, numberValue) {
        if (this.has(key)) {
            let _value = this.get(key);
            this.set(key, _value - numberValue);
        }
    }

    remove(key) {
        this.delete(key);
    }

}

export class AvgMap extends Map {

    constructor(options = {}) {
        super();
        this.count = new SumMap();
        this.total = new SumMap();

        if (options.saveRecords) {
            this.savedRecords = new GroupByMap();
        }
    }

    add(key, numberValue) {
        this.total.add(key, numberValue);
        this.count.add(key, 1);
        this.set(key, this.total.get(key) / this.count.get(key));

        if (this.savedRecords) {
            this.savedRecords.add(key, numberValue);
        }
    }

    history(key) {
        return this.savedRecords.get(key);
    }

    subtract(key, numberValue) {
        this.total.subtract(key, numberValue);
        this.count.subtract(key, 1);

        if (this.savedRecords) {
            this.savedRecords.remove(key, numberValue);
        }
    }
}