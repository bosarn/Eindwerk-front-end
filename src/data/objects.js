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
const FETCH_OBJECTS = "FETCH_OBJECTS";
const FETCH_OBJECTS_SUCCESS = "FETCH_OBJECTS_SUCCESS";
const FETCH_OBJECTS_ERROR = "FETCH_OBJECTS_ERROR";

/*******************/
/* ACTION CREATORS */
/*******************/

export const getObjects = () => (dispatch) => {
  dispatch(loadObjects());
  axios
    .get(`http://192.168.0.128:8000/api/objects`)
    .then((res) => {
      //console.log(res);
      if (res.data === null) {
        dispatch(setError("No objects found"));
      } else {
        dispatch(setObjects(res.data["hydra:member"],[]));
      }
    })
    .catch((error) => setError("Api endpoint could not be reached"));
};

export const loadObjects = () => ({ type: FETCH_OBJECTS });

export const setObjects = (objects) => ({
  type: FETCH_OBJECTS_SUCCESS,
  payload: objects,
});

export const setError = (msg) => ({ type: FETCH_OBJECTS_ERROR, payload: msg });

/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_OBJECTS:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_OBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: true,
        data: payload,
      };

    case FETCH_OBJECTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
