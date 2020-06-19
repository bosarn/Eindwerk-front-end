import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import objectsReducer from "./objects";
import filterReducer from "./filter"
import objectReducer from './object'
import shoppingcartReducer from './shoppingcart'
import carouselReducer from './carousel'
import orderReducer from './orders'

export default createStore(
    combineReducers({
      objects: objectsReducer,
      filters: filterReducer,
      object: objectReducer,
      shoppingcart: shoppingcartReducer,
      carousel: carouselReducer,
      orders : orderReducer,
    }),
    applyMiddleware(thunk)
  );
  