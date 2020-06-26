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
const FETCH_CATEGORY = "FETCH_CATEGORY";
const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
const FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR";

/*******************/
/* ACTION CREATORS */
/*******************/

export const getCategories = (objectID) => (dispatch) => {
  dispatch(loadCategories());
  axios
    //.get(`${process.env.REACT_APP_API_URL}objects/${objectID}`)
    .get(`http://127.0.0.1:8000/api/categories?page=1`)
    .then((res) => {
      console.log(res)
      if (res.data === null) {
        dispatch(setError("No categories found"));
      } else {
        dispatch(setCategories(res.data));
      }
    })
    .catch((error) => setError("Api endpoint could not be reached"));
};

export const loadCategories = () => ({ type: FETCH_CATEGORY });

export const setCategories = (object) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: object,
});

export const setError = (msg) => ({ type: FETCH_CATEGORY_ERROR, payload: msg });

/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORY:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: true,
        data: payload,
      };

    case FETCH_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
