import axios from "axios";

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
const FETCH_OBJECTS = "FETCH_OBJECTS";
const FETCH_OBJECTS_SUCCESS = "FETCH_OBJECTS_SUCCESS";
const FETCH_OBJECTS_ERROR = "FETCH_OBJECTS_ERROR";
const FETCH_NEXT_OBJECTS = "FETCH_NEXT_OBJECTS";
const FETCH_NEXT_OBJECTS_SUCCESS = "FETCH_NEXT_OBJECTS_SUCCESS";


/*******************/
/* ACTION CREATORS */
/*******************/

export const getObjects = (str) => (dispatch) => {
  dispatch(loadObjects());
  let search = '';
  str ? search  = str : str = ''; 
  axios
    .get(`${process.env.REACT_APP_API_URL}objects?page=1&name=${search}`)
    .then((res) => {
      if (res.data["hydra:member"].length === 0) {
        dispatch(setError("No objects found"));
      } else {
        
        dispatch(setObjects(
          res.data["hydra:member"], 
          parseInt(res.data["hydra:totalItems"],10),
          
          ));
          if ( parseInt(res.data["hydra:totalItems"],10)> res.data["hydra:member"].length) {
            dispatch(getNextObjects(search))
          }
      }
    })
    .catch((error) => setError("Api endpoint could not be reached"));
};


export const getNextObjects = str => (dispatch, getState) => {
  const {
    objects: {
      progress: { page, pages }
    }
  } = getState();
  const pageToLoad = page + 1;
  dispatch(loadNextObjects(pageToLoad));
  axios
    .get(
      `${process.env.REACT_APP_API_URL}objects?page=${pageToLoad}&name=${str}`
    )
    .then(res => {
      dispatch(setNextObjects(res.data["hydra:member"]));
      if (pageToLoad !== pages) {
        dispatch(getNextObjects(str));
      }
    })
    .catch(error => dispatch(setError("Api endpoint could not be reached")));
};






export const loadObjects = () => ({ type: FETCH_OBJECTS });

export const setObjects = (objects,total) => ({
  type: FETCH_OBJECTS_SUCCESS,
  payload: 
  {objects,
  total}
});

export const loadNextObjects = page => ({
  type: FETCH_NEXT_OBJECTS,
  payload: page
});
export const setNextObjects = objects => ({
  type: FETCH_NEXT_OBJECTS_SUCCESS,
  payload: objects
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
        progress: {
          page: 1,
          pages: 0,
          loaded: 0,
          total: 0
        }
      };
    case FETCH_OBJECTS_SUCCESS:
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

    case FETCH_OBJECTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
  case FETCH_NEXT_OBJECTS:
    return {
      ...state,
      error: "",
      progress: {
        ...state.progress,
        page: payload
      }
    };
  case FETCH_NEXT_OBJECTS_SUCCESS:
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
