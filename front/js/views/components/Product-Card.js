/**
 * Function which create a product element
 * This element is used on the home page
 * @param product
 * @returns {HTMLAnchorElement}
 */
export default function createProductCardUI(product) {
  const productCardUI = document.createElement("a");
  productCardUI.setAttribute("href", `./product.html?id=${product._id}`);

  productCardUI.innerHTML = `
    <article>
      <img src=${product.imageUrl} alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
    `;

  return productCardUI;
}
