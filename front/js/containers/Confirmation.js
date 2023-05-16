/**
 * Function to get the order id from url params
 * @returns {string}
 */
export default function renderConfirmation() {
  // we get the url query
  const query = window.location.search;
  // we get the url params from query
  const urlParams = new URLSearchParams(query);
  // we get the id param from url params
  const orderId = urlParams.get("orderId");

  document.querySelector("#orderId").innerHTML = orderId ;
}


