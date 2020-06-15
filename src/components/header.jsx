import { useSelector,useDispatch } from "react-redux";
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  AppBar, Toolbar ,Typography } from '@material-ui/core';
import {Link} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Button, Badge} from "@material-ui/core"


export default  () => {

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 50px',
  },
  images: {
      width: '90px',
      margin: '10px'
  },
  toolbar : {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& nav' : {
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
  },
  Navigation: {
      listStyleType: 'none',
      margin: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',

      '& li': {
          paddingRight: '20px',
          marginRight: '10px',
      },
      '& li a': {
        textDecoration: 'none',        
        color: 'white',
        display: 'block',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',     
      
      },
      '& li a:hover': {
        color: 'black', 
      },
    }
  
});


const data = useSelector((state) => ({
  cart: state.shoppingcart,
}));

const classes = useStyles();
const CartTotal = data.cart.length
//data.cart.reduce ( (a,b) => a + b.quantity, 0)




return (
<AppBar position="static" className={classes.root} >
  
  <Toolbar className={classes.toolbar}>
  <img className={classes.images} src='/logo.png' alt='logo'></img>
    <Typography variant="h2" >
      3D-PrintFarm
    </Typography>
    <nav>
          <ul className={classes.Navigation}>
         <li> <Badge 
          badgeContent={CartTotal}
          color="secondary">
              <Link to="/shopping-cart">
              <ShoppingCartIcon/>
              </Link>
            </Badge></li>

            <li>
              <Badge>
              
              <Link to="/profile">
              <AccountCircleIcon/>
            </Link>
            </Badge>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
    </Toolbar>
</AppBar>



    )
}