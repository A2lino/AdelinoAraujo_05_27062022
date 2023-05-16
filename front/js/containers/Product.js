import * as api from "../app/Api.js";
import renderProductUI from "../views/Product.js";
import { displayConfirmation } from "../views/Product.js";
import Cart from "./Cart.js";
import Storage from "../app/Storage.js";

/**
 * Function to render the product
 * It's used on the product page
 */
export default function renderProduct(){
  const productId = getId();
  const product = api.getProduct(productId);

  renderProductUI(product);
  handleAddToCart(productId);
}

/**
 * Function to handle the add to cart user action
 */
function handleAddToCart() {
  const addToCartBtn = document.querySelector("#addToCart");

  addToCartBtn.addEventListener("click", () => {
    const newProduct = createProduct();

    if (newProduct.color !== undefined && newProduct.quantity > 0) {
      const store = new Storage() ;
      const cart = new Cart(store);
      cart.addToCart(newProduct)

      displayConfirmation();

    }
  });
}

/**
 * function to create a product from user choices
 * @returns {{quantity: *, color: *, id: string}}
 */
function createProduct() {
  const product = {
    id: getId(),
    name: getName(),
    image: getImage(),
    color: getColorOption(),
    price: getPrice(),
    quantity: getQuantity(),
  };

  return product;
}

/**
 * Function to get product color option
 * @returns {*}
 */
function getColorOption() {
  const allColors = document.getElementById("colors");
  const color = allColors.options[allColors.selectedIndex].value;

  if (color !== "") {
    return color;
  }
}

/**
 * Function which returns the product image url
 * @returns {string}
 */
function getImage() {
  const image = document.querySelector(".item__img img").src;
  return image;
}

/**
 * Function which returns the product name
 * @returns {string}
 */
function getName() {
  const name = document.querySelector("#title").innerHTML;
  return name;
}

/**
 * Function which return the product quantity
 * @returns {*}
 */
function getQuantity() {
  const quantity = Number(document.querySelector("#quantity").value);

  return quantity;
}

/**
 * Function which returns product price
 * @returns {string}
 */
function getPrice() {
  const price = Number(document.querySelector("#price").innerHTML);
  return price;
}

/**
 * Function which returns the product id from the url
 * @returns {string}
 */
function getId() {
  // we get the url query
  const query = window.location.search;
  // we get the url params from query
  const urlParams = new URLSearchParams(query);
  // we get the id param from url params
  const id = urlParams.get("id");

  return id;
}
