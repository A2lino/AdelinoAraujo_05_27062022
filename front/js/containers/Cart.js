/**
 * Class to manage cart actions
 */
export default class Cart {
  constructor(store) {
    this.store = store;

    // if cart item in local storage
    this.cart = Array.isArray(JSON.parse(localStorage.getItem("cart")))
      // get it to create the cart items
      ? JSON.parse(localStorage.getItem("cart"))
      // else create empty cart
      : [];
  }

  /**
   * Method to sync the product quantity from user input on Cart page
   * @param product
   */
  setQuantity(product) {
    if (this.isInCart(product)) {
      const productIndex = this.getIndex(product);
      this.cart[productIndex].quantity = product.quantity;
      this.store.syncStore(this.cart);

    } else {
      this.cart.push(product);
      this.store.syncStore(this.cart);
    }
  }

  /**
   * Method to add a product to the cart from the product page
   * @param product
   */
  addToCart(product){
    if (this.isInCart(product)) {
      const productIndex = this.getIndex(product);
      this.cart[productIndex].quantity += product.quantity;
      this.store.syncStore(this.cart);

    } else {
      this.cart.push(product);
      this.store.syncStore(this.cart);
    }
  }

  /**
   * Method to remove a product form the cart
   * @param product
   */
  remove(product) {
    const index = this.getIndex(product);
    this.cart.splice(index, 1);
    this.store.syncStore(this.cart);
  }

  clearCart(){
    this.cart = [] ;
    this.store.syncStore(this.cart) ;
  }

  /**
   * Method to get a product index
   * @param product
   * @returns {number}
   */
  getIndex(product) {
    const index = this.cart.findIndex(
      (prod) => prod.id === product.id && prod.color === product.color
    );

    return index;
  }

  /**
   * Method to check if a product is in the cart
   * @param product
   * @returns {boolean}
   */
  isInCart(product) {
    return this.getIndex(product) !== -1;
  }

  /**
   * Method to get the total price of all products in cart
   * @returns {number}
   */
  getTotalPrice() {
    let totalPrice = 0;

    for (let i = 0; i < this.cart.length; i++) {
      totalPrice += this.cart[i].price * this.cart[i].quantity;
    }

    return totalPrice;
  }

  getAllId(){
    const allId = [] ;
    this.cart.map(product => allId.push(product.id)) ;

    return allId ;
  }
}
