/**
 * Function which render the product on the product page
 * This element is used on the product page
 * @param product
 */
export default function renderProductUI(product) {
  product.then((prod) => {
    // we render the product name
    document.querySelector("#title").innerHTML = prod.name;

    // we create and append the product image
    const productImage = createProductImage(prod.imageUrl, prod.altTxt);
    document.querySelector(".item__img").appendChild(productImage);

    // we render the product price
    document.querySelector("#price").innerHTML = prod.price;

    // we render the description
    document.querySelector("#description").innerHTML = prod.description;

    // we render the product options
    prod.colors.map((color) => {
      const colorOption = createProductOption(color);
      document.querySelector("#colors").appendChild(colorOption);
    });
  });
}

/**
 * Function which create the product image element
 * @param imageUrl
 * @returns {HTMLImageElement}
 */
function createProductImage(imageUrl, altTxt) {
  const img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  img.setAttribute("alt", altTxt)

  return img;
}

/**
 * Function which create a product option element ;
 * @param option
 * @returns {HTMLOptionElement}
 */
function createProductOption(option) {
  const opt = document.createElement("option");
  opt.setAttribute("value", option);
  opt.innerText = option;

  return opt;
}

export function displayConfirmation(){
  document.querySelector(".confirmation-add").setAttribute("visible", true) ;
}
