import { useSelector,useDispatch } from "react-redux";
import React,{useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  
  Paper, 
  Toolbar ,
  Typography, 
  Menu,
  MenuItem,
  Fade  } 
  from '@material-ui/core';


export default () => {


    const useStyles = makeStyles( theme =>({
        root: {
        marginTop: '50px',
        borderTop: '1px solid grey',

        }  
      }));

      const classes = useStyles();

    return (


<Paper className={classes.root}>
        <Typography> Categories mapped and shown</Typography>
       


</Paper>


    )
}