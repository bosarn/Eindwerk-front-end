/*****************/
/* INITIAL STATE */
/*****************/


const initialState = [];

/*********/
/* TYPES */
/*********/
const PUSH_ITEM_TO_CART = "PUSH_ITEM_TO_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const SET_OBJECT_QUANTITY = "SET_OBJECT_QUANTITY";
const CLEAR_SHOPPING_CART = "CLEAR_SHOPPING_CART";
/*******************/
/* ACTION CREATORS */
/*******************/

// push 1 item to cart adjust quantity on more pushes?
// remove items
// setquantity

export const pushItemToCart = (itemID) => ({
  type: PUSH_ITEM_TO_CART,
  payload: itemID,
});
export const removeItemFromCart = (itemID) => (
  
  {
  type: REMOVE_ITEM_FROM_CART,
  payload: itemID,
});

export const setObjectQuantity = (itemID, quantity) => ({
  type: SET_OBJECT_QUANTITY,
  payload: itemID,
  numberload: quantity,
});
export const clearShoppingCart = () => ({
  type: CLEAR_SHOPPING_CART,
});

/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload, numberload }) => {
  switch (type) {
    case PUSH_ITEM_TO_CART:
      
      const object = state.find((id) => id.print["@id"] === payload["@id"]);
      if (object) {
        object.quantity += 1;
        
      } else {
        state.push({ print: payload, quantity: 1 });
      }

      return state;

    case REMOVE_ITEM_FROM_CART:
      if (state.find((id) => id.print["@id"] === payload["@id"])) {
        
        state =  state.filter(id => id.print["@id"] !== payload["@id"]);
      }

      return state;

    case SET_OBJECT_QUANTITY:
      
 
      if (state.find((id) => id.print["@id"] === payload)) {
        let change = state.find((id) => id.print["@id"] === payload);
        change.quantity = numberload;
      }

      return state;

    case CLEAR_SHOPPING_CART:
      
      state = []
      return state;

    default:
      return state;
  }
};
