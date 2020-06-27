import { useSelector,useDispatch } from "react-redux";
import React,{useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  
  Paper, 
  Typography,
 } 
  from '@material-ui/core';
  import {getCategories} from '../data/categories'


export default () => {

const dispatch = useDispatch();


useEffect(() => {
  dispatch(getCategories())

}, []);


    const useStyles = makeStyles( theme =>({
        root: {
        marginTop: '50px',
        paddingTop: '5px',
        borderTop: '1px solid grey',
        },
        image: {
          height: '100px',
          borderRadius: '100px',
        },
        categoryPanel: {
          display: 'flex',
          paddingBottom: '130px',

        },
        description: {
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '2em'
        },
        center: {
          marginLeft: '15%',
        }

      }));

      const classes = useStyles();

      const stateData = useSelector((state) => ({
        categories: state.categories
      }));
    
     const  {data} = stateData.categories

    return (




<Paper className={classes.root}>

      {data['hydra:member'] ? data['hydra:member'].map( category =>

<Paper className={classes.categoryPanel}>
<div className={classes.center}>
  <img src={`https://wdev.be/wdev_arno/eindwerk/system/public${category.image}`} alt='CategoryNames' className={classes.image}></img>
  <div className={classes.description}>
  <Typography variant='h5'> {category.name} </Typography>
  <Typography variant='body2'>{category.description}</Typography>
  </div>
  </div>
</Paper>

      )
      : ''}
       


</Paper>


    )
}
