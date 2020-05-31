
/*****************/
/* INITIAL STATE */
/*****************/
const initialState = []



/*********/
/* TYPES */
/*********/
const PUSH_ITEM_TO_CART = "PUSH_ITEM_TO_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const SET_OBJECT_QUANTITY = "SET_OBJECT_QUANTITY";

/*******************/
/* ACTION CREATORS */
/*******************/

// push 1 item to cart adjust quantity on more pushes?
// remove items
// setquantity


export const pushItemToCart = (itemID) => ({
    type: PUSH_ITEM_TO_CART,
    payload: itemID
})
export const removeItemFromCart = (itemID) => ({
    type: REMOVE_ITEM_FROM_CART,
    payload: itemID
})

export const setObjectQuantity = (itemID,quantity) => ({
    type: SET_OBJECT_QUANTITY,
    payload: itemID,quantity
})



/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PUSH_ITEM_TO_CART:
        // if object already in cart do +1 
          // else push object in 
          console.log(payload)
          console.log(payload["@id"])
          const object = state.find( id => id.print["@id"] === payload["@id"])
          console.log(object)
          if (object)
          {
                object.quantity += 1
                
          }
           else {
               state.push( 
                   { 'print': payload,
                    'quantity': 1}
                     )} 
                


            return state

    case REMOVE_ITEM_FROM_CART:
        if ( state.find( id => id.print["@id"] === payload["@id"])) {
            state.shift( state.find( id => id.print["@id"] === payload["@id"]))
            console.log('werkt')
        }
    
        return state;

    case SET_OBJECT_QUANTITY:
// todo set object + remove all

      return {
        ...state,

      };
    default:
      return state;
  }
};
