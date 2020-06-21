import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getOrders} from '../data/orders'


export default () => {

    const data = useSelector((state) => ({
        orders : state.orders
    }));

const dispatch = useDispatch();

useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);


  const useStyles = makeStyles({
    Order: {
        marginTop: "3rem",
        marginLeft: "3em",
        width: '40%'
    },
    panel: {
        borderTop: "20px solid pink",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
      test: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
  });

  const classes = useStyles();

return (

    <> 
     <p>{data.orders.error} </p>
    <ul>
     {data.orders.data.map( order=>
       <li> {order}</li>  )}
     
    </ul>
    
    </>
)

}