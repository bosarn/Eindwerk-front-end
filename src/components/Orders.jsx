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

console.log(data)
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