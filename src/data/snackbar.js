
/*****************/
/* INITIAL STATE */
/*****************/
const initialState = {
    dash: {
      message:'',
      open:false,
      severity: ''
    }
  };
  
  /*********/
  /* TYPES */
  /*********/
  const TOAST_DASH_MESSAGE = 'TOAST_DASH_MESSAGE';
  const TOAST_DASH_CLEAR = 'TOAST_DASH_CLEAR';

  
  /*******************/
  /* ACTION CREATORS */
  /*******************/
  export function ToastDashMessage (message, severity) {
  
    return {
      type: TOAST_DASH_MESSAGE,
      payload: { message, severity}
    };
  
  }
  export function ToastDashClear () {
    
    return {
      type: TOAST_DASH_CLEAR
    };
  
  }
  
  /***********/
  /* REDUCER */
  /***********/


  export default function(state = initialState, { type, payload }) {

    switch (type) {
  
      case TOAST_DASH_MESSAGE:
        {
          return {...state,
            dash: {
              message:payload.message,
              open:true,
              severity : payload.severity
            }
          };
        }
  
      case TOAST_DASH_CLEAR:
        {
   
          return {...state,
            dash: {
              message:"",
              open:false
            }
          };
        }
        default:
            return state;
    }

  }