import * as api from "../app/Api.js";
import createProductCardUI from "./components/Product-Card.js";

/**
 * Function that generates the products gallery
 */
export function renderProductsGallery(){
  const items = document.querySelector("#items");
  const allProducts = api.getAllProducts();

  allProducts.then((data) => {
    data.forEach((product) => {
      const productUI = createProductCardUI(product);
      items.appendChild(productUI);
    });
  });

}