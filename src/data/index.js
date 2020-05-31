import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import objectsReducer from "./objects";
import filterReducer from "./filter"
import objectReducer from './object'
import shoppingcartReducer from './shoppingcart'

export default createStore(
    combineReducers({
      objects: objectsReducer,
      filters: filterReducer,
      object: objectReducer,
      shoppingcart: shoppingcartReducer,
    }),
    applyMiddleware(thunk)
  );
  