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
const FETCH_OBJECT = "FETCH_OBJECT";
const FETCH_OBJECT_SUCCESS = "FETCH_OBJECT_SUCCESS";
const FETCH_OBJECT_ERROR = "FETCH_OBJECT_ERROR";

/*******************/
/* ACTION CREATORS */
/*******************/

export const getObject = (objectID) => (dispatch) => {
  dispatch(loadObject());
  axios
    .get(`${process.env.REACT_APP_API_URL}objects/${objectID}`)
    .then((res) => {
      console.log(res)
      if (res.data === null) {
        dispatch(setError("No objects found"));
      } else {
        dispatch(setObject(res.data));
      }
    })
    .catch((error) => setError("Api endpoint could not be reached"));
};

export const loadObject = () => ({ type: FETCH_OBJECT });

export const setObject = (object) => ({
  type: FETCH_OBJECT_SUCCESS,
  payload: object,
});

export const setError = (msg) => ({ type: FETCH_OBJECT_ERROR, payload: msg });

/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_OBJECT:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_OBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: true,
        data: payload,
      };

    case FETCH_OBJECT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
