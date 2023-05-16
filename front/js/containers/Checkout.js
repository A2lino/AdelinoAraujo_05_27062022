import { isContainInvalidCaracters, isValidEmail } from "../utils.js";
import Cart from "./Cart.js";
import { postOrder } from "../app/Api.js";
import Storage from "../app/Storage.js";

/**
 * Function in charge of the checout process
 */
export default function renderCheckout(){
  handlerUserInput() ;
  handleOrder() ;
}

/**
 * Function to get the first name input
 * @returns {*|string}
 */
function getFirstName(){
  return document.querySelector("#firstName").value.trim() ;
}

/**
 * Function to get the last name input
 * @returns {*|string}
 */
function getLastName(){
  return document.querySelector("#lastName").value.trim() ;
}

/**
 * Function to get the address input
 * @returns {*|string}
 */
function getAddress(){
  return document.querySelector("#address").value.trim() ;
}

/**
 * Function to get the city input
 * @returns {*|string}
 */
function getCity(){
  return document.querySelector("#city").value.trim() ;
}

/**
 * Function to get the email input
 * @returns {*|string}
 */
function getEmail(){
  return document.querySelector("#email").value.trim() ;
}

/**
 * Function to display an error message
 * @param message
 * @param errorMsgId
 */
function displayErrorMessage(message, errorMsgId){
  document.querySelector(errorMsgId).innerHTML = message;
}

function removeErrorMessage(errorMsgId){
  document.querySelector(errorMsgId).innerHTML = "" ;
}

/**
 * Function to check the first name input
 * @returns {boolean}
 */
function isFirstNameValid(){
  const firstName = getFirstName() ;
  const errorMsgField = "#firstNameErrorMsg" ;

  if (isContainInvalidCaracters.test(firstName)){
    displayErrorMessage("Le prénom contient des caractères non autorisés", errorMsgField) ;

    return false ;

  } else if(firstName.length < 2){
    displayErrorMessage("Le prénom doit comporter au moins deux caractères", errorMsgField )

    return false ;
  }

  removeErrorMessage(errorMsgField) ;

  return true ;
}

/**
 * Function to check the last name input
 * @returns {boolean}
 */
function isLastNameValid(){

  const lastName = getLastName() ;
  const errorMsgField = "#lastNameErrorMsg"

  if (isContainInvalidCaracters.test(lastName)){
    displayErrorMessage("Le nom contient des caractères non autorisés", errorMsgField) ;

    return false ;

  } else if(lastName.length < 2){
    displayErrorMessage("Le nom doit comporter au moins deux caractères", errorMsgField ) ;

    return false ;
  }

  removeErrorMessage(errorMsgField) ;

  return true ;
}

/**
 * Function to check the address input
 * @returns {boolean}
 */
function isAddressValid(){
  const address = getAddress() ;
  const errorMsgField = "#addressErrorMsg"

  if(address.length < 2){
    displayErrorMessage("L'adresse doit comporter au moins deux caractères", errorMsgField ) ;

    return false ;
  }

  removeErrorMessage(errorMsgField) ;

  return true ;
}

/**
 * Function to check the city input
 * @returns {boolean}
 */
function isCityValid(){
  const city = getCity() ;
  const errorMsgField = "#cityErrorMsg"

  if (isContainInvalidCaracters.test(city)){
    displayErrorMessage("La ville contient des caractères non autorisés", errorMsgField) ;

    return false ;

  } else if(city.length < 2){
    displayErrorMessage("La ville doit comporter au moins deux caractères", errorMsgField ) ;

    return false ;
  }

  removeErrorMessage(errorMsgField) ;

  return true ;
}

/**
 * Function to check the email input
 * @returns {boolean}
 */
function isEmailValid() {
  const email = getEmail();
  const errorMsgField = "#emailErrorMsg"

  if (!isValidEmail.test(email)) {
    displayErrorMessage("L'email n'est pas valide", errorMsgField);

    return false;
  }

  removeErrorMessage(errorMsgField) ;

  return true;
}

/**
 * Function to check the form
 * @returns {boolean}
 */
function isFormValid(){

  if (
    isFirstNameValid() &&
    isLastNameValid() &&
    isAddressValid() &&
    isCityValid() &&
    isEmailValid()
  ) {
    return true ;
  } else {
    return false ;
  }
}

/**
 * Function to handle user input check
 */
function handlerUserInput(){
  document.querySelector("#firstName").addEventListener("change", isFirstNameValid) ;
  document.querySelector("#lastName").addEventListener("change", isLastNameValid) ;
  document.querySelector("#address").addEventListener("change", isAddressValid) ;
  document.querySelector("#city").addEventListener("change", isCityValid) ;
  document.querySelector("#email").addEventListener("change", isEmailValid) ;
}

/**
 * Function to handle order button
 */
function handleOrder(){
  const order = document.querySelector("#order") ;
  order.addEventListener("click", orderCommand) ;
}

/**
 * Function to post order if all inputs are ok
 * @param event
 */
function orderCommand(event){
  event.preventDefault() ;

  const isForm = isFormValid() ;
  const allId = new Cart().getAllId() ;


  if (isForm){

    const order = {
      contact :{
        firstName: getFirstName(),
        lastName: getLastName(),
        address: getAddress(),
        city: getCity(),
        email: getEmail()
      },
      products: allId
    }

    const store = new Storage() ;
    new Cart(store).clearCart() ;
    postOrder(order) ;
  }
}


