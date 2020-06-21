import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getOrders} from '../data/orders'
import { Typography, Paper, ExpansionPanel, ExpansionPanelDetails,ExpansionPanelSummary } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


export default () => {

    const data = useSelector((state) => ({
        orders : state.orders
    }));


const dispatch = useDispatch();

useEffect(() => {

    dispatch(getOrders());
  }, [dispatch]);


  const useStyles = makeStyles(theme => ({
    Order: {
        marginTop: '3em',
        width: '100%'
    },
    panel: {
      marginLeft: 'auto',
      marginRight: 'auto',
        borderTop: `20px solid ${theme.palette.secondary.detail}`,
        display: "flex",
        flexDirection: "column",
        width: "70%",
      },
      orderdetails: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
  }));
console.log(data.orders.data)
  const classes = useStyles();

return (
    <>
 


    {data.orders.data["hydra:member"] ? 
     data.orders.data["hydra:member"][0].orders.length === 0 ? <Typography variant='h2'> You have no orders yet, poor sodding bastard. Spend more money on webshops and less on food and drinks BANDIET!</Typography> : 
    <Paper className={classes.Order}>
        <ul>
        {data.orders.data["hydra:member"][0].orders.map( (orders,i) => 

        <li key={i}>
<ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.orderdetails}>

            <Typography variant='h5' align='center'>Orderdate: {orders.date.slice(0,10)}</Typography>
            



          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
            <ul>
                <li>            <Typography variant='body1' align='center'> <strong>Your order status :</strong>{orders.status} </Typography></li>
            <li>          <Typography variant='body1' align='center'> <strong>Shipping to : </strong>{orders.shippingAdress} </Typography></li>

      <li><Typography variant='body1' align='center'> <strong>Order made :</strong>  {orders.date.slice(20)}</Typography></li>  
      </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        </li>

        
        ) 
        
        
        }
        </ul>
        </Paper>

    
  

    :     <Paper className={classes.Order}>
        <Typography> Loading orders...</Typography> 
        </Paper>
    
    
    }
   
   
    


         

    </>
)

}
