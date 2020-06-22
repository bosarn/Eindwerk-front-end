

/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
    filters: [],
    allCategories: []
  };
  
  /*********/
  /* TYPES */
  /*********/
  const GETFILTERS = "GETFILTERS";
  const TOGGLE_FILTERS = "TOGGLE_FILTERS";
  const ALLCATEGORIES = 'ALLCATEGORIES'
  
  /*******************/
  /* ACTION CREATORS */
  /*******************/

  export const loadFilter = () => ({ type: GETFILTERS });
  
  export const toggleFilter = (filterName) => ({
    type: TOGGLE_FILTERS,
    payload: filterName,
  });

  export const setAllCategories = ( categories) => ({
    type: ALLCATEGORIES,
    payload: categories,
  })
  
 
  
  /***********/
  /* REDUCER */
  /***********/

  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case GETFILTERS:
        return {
          ...state
        };
      case TOGGLE_FILTERS:
          // if filtername is already in state remove it
          if(state.filters.includes(payload)){
                state.filters=state.filters.filter( filter => filter !== payload)
          }
          // if filter is new add it
          else{
            
              state.filters.push(payload)
          }
        return {...state};
      case ALLCATEGORIES:

          return {
              allCategories: payload,
              ...state
          }
  
      default:
        return state;
    }
  };
  