import { useSelector,useDispatch } from "react-redux";
import React,{useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  
  Paper, 
  Typography,
 } 
  from '@material-ui/core';


export default () => {

const dispatch = useDispatch();


    const useStyles = makeStyles( theme =>({
        root: {
        marginTop: '50px',
        borderTop: '1px solid grey',

        }  
      }));

      const classes = useStyles();

    
console.log()
      
    return (


<Paper className={classes.root}>
        <Typography> Categories mapped and shown</Typography>

       


</Paper>


    )
}

/**
 * 
      useEffect(() => {
        dispatch(());
    
      }, []);
    

 */