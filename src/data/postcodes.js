import axios from "axios";
import {ToastDashMessage} from './snackbar'



/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
  loading: false,
  error: "",
  data: [],
  progress: {
    page: 0,
    pages: 0,
    total: 0,
    loaded: 0
  }
};

/*********/
/* TYPES */
/*********/
const FETCH_CODES = "FETCH_CODES";
const FETCH_CODES_SUCCESS = "FETCH_CODES_SUCCESS";
const FETCH_CODES_ERROR = "FETCH_CODES_ERROR";
const FETCH_CODES_NEXT = "FETCH_CODES_NEXT";
const FETCH_CODES_NEXT_SUCCESS = "FETCH_CODES_NEXT_SUCCESS";


/*******************/
/* ACTION CREATORS */
/*******************/

export const getObjects = () => (dispatch) => {
  dispatch(loadObjects());
  axios
    .get(`${process.env.REACT_APP_API_URL}postcodes?page=1`)
    .then((res) => {
      
      if (res.data["hydra:member"].length === 0) {
        dispatch(ToastDashMessage("No objects found",'warning'))
        dispatch(setError("No objects found"))
      } else {
        
        dispatch(setObjects(
          res.data["hydra:member"], 
          parseInt(res.data["hydra:totalItems"],10),
          
          ));
          if ( parseInt(res.data["hydra:totalItems"],10)> res.data["hydra:member"].length) {
            dispatch(getNextObjects())
          }
      }
    })
    .catch((error) => setError("Api endpoint could not be reached"));
};


export const getNextObjects = () => (dispatch, getState) => {
  const {
    objects: {
      progress: { page, pages }
    }
  } = getState();
  const pageToLoad = page + 1;
  dispatch(loadNextObjects(pageToLoad));
  axios
    .get(
      `${process.env.REACT_APP_API_URL}postcodes?page=${pageToLoad}`
    )
    .then(res => {
      dispatch(setNextObjects(res.data["hydra:member"]));
      if (pageToLoad !== pages) {
        dispatch(getNextObjects());
      }
    })
    .catch(error => dispatch(setError("Api endpoint could not be reached")));
};






export const loadObjects = () => ({ type: FETCH_CODES });

export const setObjects = (objects,total) => ({
  type: FETCH_CODES_SUCCESS,
  payload: 
  {objects,
  total}
});

export const loadNextObjects = page => ({
  type: FETCH_CODES_NEXT,
  payload: page
});
export const setNextObjects = objects => ({
  type: FETCH_CODES_NEXT_SUCCESS,
  payload: objects
});

export const setError = (msg) => ({ type: FETCH_CODES_ERROR, payload: msg });

/***********/
/* REDUCER */
/***********/

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CODES:
      return {
        ...state,
        loading: true,
        error: "",
        progress: {
          page: 1,
          pages: 0,
          loaded: 0,
          total: 0
        }
      };
    case FETCH_CODES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload.objects,
        progress: {
          ...state.progress,
          loaded: payload.objects.length,
          pages: Math.ceil(payload.total / payload.objects.length),
          total: payload.total
        }
      };

    case FETCH_CODES_ERROR:

      return {
        ...state,
        loading: false,
        error: payload,
      };
  case FETCH_CODES_NEXT:
    return {
      ...state,
      error: "",
      progress: {
        ...state.progress,
        page: payload
      }
    };
  case FETCH_CODES_NEXT_SUCCESS:
    return {
      ...state,
      loading: false,
      data: [...state.data, ...payload],
      progress: {
        ...state.progress,
        loaded: state.progress.loaded + payload.length
      }
    };
    default:
      return state;
  }
};
