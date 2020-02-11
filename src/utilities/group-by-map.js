class GroupByMap {
  constructor() {
    this._change = new Map();
    this._totalItemCount = 0;
  }

  size() {
    return this._change.size;
  }

  put(key, value) {
    this._change.set(key, value);
  }

  add(key, value) {
    if (this._change.has(key)) {
      this._change.get(key).push(value);
    } else {
      this._change.set(key, [value]);
    }

    this._totalItemCount++;
  }

  get(key) {
    return this._change.get(key);
  }

  has(key) {
    return this._change.has(key);
  }

  removeByKey(key) {
    let object = this._change.get(key);

    object.splice(0, 1);
    this._totalItemCount--;

    if (!object.length) {
      this._change.delete(key)
    }
  }

  remove(key, value) {
    let object = this._change.get(key);

    let index = object ? object.indexOf(value) : -1;

    if (index > -1) {
      object.splice(index, 1);
      this._totalItemCount--;
    }
  }

  getValues() {
    return [...this._change.values()];
  }

  getMap() {
    return this._change;
  }

  totalItemCount() {
    return this._totalItemCount;
  }
}

export default GroupByMap
