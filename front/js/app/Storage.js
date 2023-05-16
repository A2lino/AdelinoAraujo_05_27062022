/**
 * Class in charge of handling local storage
 */
export default class Storage {
  constructor() {}

  addItem(key, value) {
    return window.localStorage.setItem(key, value);
  }

  removeItem(key) {
    window.localStorage.removeItem(key);
  }

  syncStore(item) {
    this.removeItem("cart");
    this.addItem("cart", JSON.stringify(item));
  }
}
