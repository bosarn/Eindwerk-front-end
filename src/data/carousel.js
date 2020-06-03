
/*****************/
/* INITIAL STATE */
/*****************/

const initialState = 0 

  
  /*********/
  /* TYPES */
  /*********/

  const SET_CAROUSEL = "SET_CAROUSEL";
  const ADVANCE_CAROUSEL = "ADVANCE_CAROUSEL";


  /*******************/
  /* ACTION CREATORS */
  /*******************/

 export const advanceCarousel = (max)  => ({ type: ADVANCE_CAROUSEL, payload: max });
 export const setCarousel = (index) => ({ type: SET_CAROUSEL, payload: index });


  /***********/
  /* REDUCER */
  /***********/

  export default (state = initialState, { type, payload }) => {
    switch (type) {
        
      case SET_CAROUSEL:
        state = payload
        return state
        
      case ADVANCE_CAROUSEL:
           
          if (state+1  >= payload){
              state = 0
          }
          else { 
            
            state += 1}
        return state

      default:
        return state;
    }
  };
  