import axios from "axios";

/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  loading: false,
  error: "",
  data: [],
};

/*********/
/* TYPES */
/*********/
const FETCH_ORDERS = "FETCH_ORDERS";
const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
const FETCH_ORDERS_ERROR = "FETCH_ORDERS_ERROR";

/*******************/
/* ACTION CREATORS */
/*******************/


//Check if JWT is active 
//return error if not 
// unfresh token will set error
export const getOrders = () => (dispatch) => {
  dispatch(loadOrders())
  axios({
        method: 'get',
        url: `https://wdev.be/wdev_arno/eindwerk/api/users`,
        headers: {
            "Content-Type": "application/ld+json; charset=utf-8",
            Authorization:
              `Bearer ${localStorage.getItem('token')}`},
  }).then((res) => {
    console.log(res)
    if (res.data === null) {
      dispatch(setError("No orders yet! place an order in the homepage"));
    } else {
      dispatch(setOrders(res.data));
    }
  })
  .catch((error) => setError(error));
};
    
   




    

export const loadOrders = () => ({ type: FETCH_ORDERS });

export const setOrders = (object) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: object,
});

export const setError = (msg) => ({ type: FETCH_ORDERS_ERROR, payload: msg });

/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ORDERS:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };

    case FETCH_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
