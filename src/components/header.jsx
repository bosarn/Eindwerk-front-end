import { useSelector,useDispatch } from "react-redux";
import React,{useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  
  AppBar, 
  Toolbar ,
  Typography, 
  Menu,
  MenuItem,
  Fade  } 
  from '@material-ui/core';
import {Link} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import {Button, Badge} from "@material-ui/core"
import SettingsIcon from '@material-ui/icons/Settings';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {currencyFormat} from '../helpers/moneyconvert'

export default  ({checker, checked}) => {
  const matches = useMediaQuery('(min-width:600px)');

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 50px',
  },
  CartHover: {
    position: 'absolute',
    marginTop: '20px',
    color: 'black',
    '& li': {
      borderBottom: '1px solid grey',
      width: '100%'
    }
  },
  images: {
      width: '100px',
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
      '& li:hover': {
        'div': {
          display: 'block'
        }
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
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};


const handleClose = () => {
  setAnchorEl(null);
};




return (
<AppBar position="static" className={classes.root} >
  
  <Toolbar className={classes.toolbar}>
  <img className={classes.images} src='/logo.png' alt='logo'></img>

   {matches ?  <Typography variant="h2" >
      3D-PrintDomain
      <Typography variant='h6' align='center' color='textSecondary'> Van idee naar 3D!</Typography>
    </Typography>
    : '' }

    <nav>
          <ul className={classes.Navigation}>
         <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}> <Badge 
          badgeContent={CartTotal}
          color="secondary">

              <ShoppingCartIcon/>
              
            </Badge>
              </Button>
              
              {data.cart ? 
              <Menu 
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              >
              {data.cart.map( object =>
                
                <MenuItem onClick={handleClose}>
                  <li><Typography >{object.print.name} X {object.quantity}</Typography>
                
                <Typography color='secondary'>{currencyFormat(object.print.currentPriceValue * object.quantity)}</Typography></li>
                </MenuItem>
                ) }
                <MenuItem onClick={handleClose}><li>Items: {CartTotal} </li></MenuItem>
                <MenuItem onClick={handleClose}><li> Total:{currencyFormat(data.cart
                .map((object) => object.print.currentPriceValue * object.quantity)
                .reduce((a, b) => a + b, 0))} </li></MenuItem>
                   <MenuItem onClick={handleClose}>                
                   <Link to="/shopping-cart">
                  <Button color='secondary'>
                Afrekenen : 
              <ShoppingCartIcon/>
              </Button></Link>    </MenuItem>
   

              </Menu>
            : 
           <p> Nothing in the basket yet!
           Try clicking a shopping cart icon.</p>
            
            }




            <li>
              <Badge>
              
              <Link to="/profile">
              <AccountCircleIcon/>
            </Link>
            </Badge>
            </li>
            <li>
              <Link to="/">
                <HomeIcon/>
              </Link>
            </li>
            <li><Button onClick={() => checker()}>  <SettingsIcon/></Button>
              
            </li>
            <li>
              <Link to="/login">
                login
              </Link>
            </li>
          </ul>
        </nav>
    </Toolbar>
</AppBar>



    )
}