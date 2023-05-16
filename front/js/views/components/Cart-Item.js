/**
 * Function to create a cart item ui element
 * This element is used on the cart page
 * @param product
 * @returns {HTMLElement}
 */
export default function createCartItemUI(product) {
  const cartItemUI = document.createElement("article");
  cartItemUI.classList.add("cart__item");
  cartItemUI.setAttribute("data-id", product.id);
  cartItemUI.setAttribute("data-name", product.name);
  cartItemUI.setAttribute("data-color", product.color);
  cartItemUI.setAttribute("data-price", product.price);
  cartItemUI.setAttribute("data-imageUrl", product.image);


  cartItemUI.innerHTML = `
  <div class="cart__item__img">
    <img src=${product.image} alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p>${product.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>`;

  return cartItemUI;
}
