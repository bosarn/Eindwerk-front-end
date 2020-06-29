import React from 'react';
import { Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useSelector, useDispatch} from 'react-redux'
import {ToastDashClear} from '../data/snackbar'


export default () => {


    const dispatch = useDispatch();

    const data = useSelector((state) => ({
        snackbar: state.snackbar
      }));


      const closeToast = () => {
            dispatch(ToastDashClear())
    }

   

    return  (

data.snackbar.dash ?

    <Snackbar open={data.snackbar.dash.open} autoHideDuration={4000} onClose={closeToast}>
    <Alert onClose={closeToast} severity={data.snackbar.dash.severity} variant="filled">
      {data.snackbar.dash.message}
    </Alert>
    </Snackbar>

:
'' 

    ) ;
  
}