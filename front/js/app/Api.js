export const api = "http://localhost:3000/api/products";

/**
 * Function which calls the api to get all products
 * @returns {Promise<any>}
 */
export async function getAllProducts() {
  const response = await fetch(api);
  const data = await response.json();

  return data;
}

/**
 * Function which calls the api to get one specific product from its id
 * @param id
 * @returns {Promise<*>}
 */
export async function getProduct(id) {
  const response = await fetch(api);
  const data = await response.json();

  const product = data.find((prod) => prod._id === id);

  return product;
}

/**
 * Function to post the order to the api
 * @param order
 */
export function postOrder(order){
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {'Content-Type': 'application/json; charset=utf-8' }
  }

  fetch(`${api}/order`, requestOptions)
    .then(res => res.json())
    .then(json => {

      window.location.href = `../html/confirmation.html?orderId=${json.orderId}` ;
    })
}
