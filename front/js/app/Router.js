import { renderProductsGallery } from "../views/Product-Gallery.js";
import renderProduct from "../containers/Product.js";
import renderCart from "../views/Cart.js";
import renderConfirmation from "../containers/Confirmation.js";
import renderCheckout from "../containers/Checkout.js";

/**
 * The router is used to dispatch actions from url pathname
 */
export default class Router{
  constructor() {
    this.pathname = window.location.pathname ;
  }

  /**
   * Get the route from the url pathname
   * @returns {string}
   */
  getRoute(){
    if (this.pathname.indexOf("index") !== -1) return "home" ;
    if (this.pathname.indexOf("product") !== -1) return "product";
    if (this.pathname.indexOf("cart") !== -1) return "cart";
    if (this.pathname.indexOf("confirmation") !== -1) return "confirmation"
  }

  /**
   * Dispatch router actions from the route
   */
  dispatch(){
    const route = this.getRoute() ;

    switch (route){
      case "home" :
        renderProductsGallery() ;
        break ;

      case "product" :
        renderProduct() ;
        break ;

      case "cart" :
        renderCart() ;
        renderCheckout() ;
        break ;

      case "confirmation" :
        renderConfirmation() ;
        break ;

      default :
        console.error("This route is not defined")
    }
  }
}