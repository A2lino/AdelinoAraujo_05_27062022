import Cart from "../containers/Cart.js";
import createCartItemUI from "./components/Cart-Item.js";
import Storage from "../app/Storage.js";

const store = new Storage() ;
const cart = new Cart(store);


/**
 * Function to render cart items
 */
export default function renderCart() {
  document.querySelector("#cart__items").innerHTML= "" ;

  cart.cart.map((product) => {
    const cartItemUI = new createCartItemUI(product);

    document.querySelector("#cart__items").appendChild(cartItemUI);

    document.querySelector("#totalPrice").innerHTML = cart.getTotalPrice();

    handleQuantityChange();

    handleDelete()

  });
}

/**
 * Function to handle the product quantity change
 */
function handleQuantityChange() {

  const itemsQuantity = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < itemsQuantity.length; i++) {
    itemsQuantity[i].addEventListener("change", () => {

     const product = getProductFeatures(itemsQuantity[i]) ;
     cart.setQuantity(product) ;

      document.querySelector("#totalPrice").innerHTML = cart.getTotalPrice();
    });
  }
}

/**
 * Function to handle product deletion from cart
 */
function handleDelete(){
  const allDeleteBtn = document.querySelectorAll(".deleteItem") ;

  for (let i = 0; i < allDeleteBtn.length; i++) {
    allDeleteBtn[i].addEventListener("click", () => {
      const id = allDeleteBtn[i].closest(".cart__item").dataset.id;
      const color = allDeleteBtn[i].closest(".cart__item").dataset.color;

      const product = {
        id: id,
        color: color
      }

      cart.remove(product)

      renderCart()

      document.querySelector("#totalPrice").innerHTML = cart.getTotalPrice();
    })
  }
}

/**
 * Function to get product features from product item
 * @param item
 * @returns {{image: string, quantity: string | number | any, color: string, price: string, name: string, id: string}}
 */
function getProductFeatures(item){
  const id = item.closest(".cart__item").dataset.id;
  const name = item.closest(".cart__item").dataset.name;
  const image = item.closest(".cart__item").dataset.imageurl;
  const color = item.closest(".cart__item").dataset.color;
  const price = item.closest(".cart__item").dataset.price;
  const quantity = item.closest(".itemQuantity").value;

  return {id, name, image, color, price, quantity}
}
