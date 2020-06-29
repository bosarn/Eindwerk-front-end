import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import objectsReducer from "./objects";
import filterReducer from "./filter"
import objectReducer from './object'
import shoppingcartReducer from './shoppingcart'
import carouselReducer from './carousel'
import orderReducer from './orders'
import snackbarReducer from './snackbar'
import categoryReducer from './categories'
import postcodesReducer from './postcodes'

export default createStore(
    combineReducers({
      objects: objectsReducer,
      filters: filterReducer,
      object: objectReducer,
      shoppingcart: shoppingcartReducer,
      carousel: carouselReducer,
      orders : orderReducer,
      snackbar : snackbarReducer,
      categories : categoryReducer,
      postcodes : postcodesReducer,

    }),
    applyMiddleware(thunk)
  );
  