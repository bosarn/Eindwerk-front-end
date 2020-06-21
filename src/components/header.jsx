import { useSelector,useDispatch } from "react-redux";
import React,{useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  
  AppBar, 
  Toolbar ,
  Typography, 
  Menu,
  MenuItem,
  Fade,
  } 
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
  const matches = useMediaQuery('(min-width:780px)');

const useStyles = makeStyles( theme =>({
  root: {
    background: theme.palette.secondary.detail,
    border: 0,
    boxShadow: 'rgba(19, 89, 19, .19)',
    color: 'white',

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
      overflow: 'contain',

      '& li': {
        padding: 0,
        margin: 0,

         [theme.breakpoints.up(780)]: { 

            paddingRight: '20px',
            marginRight: '10px',
        },

      },

      '& li:hover': {
        'div': {
          display: 'block'
        },
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
        color: theme.palette.secondary.main,

      },
      '& li button': {
        textDecoration: 'none',        
        color: 'white',
        justifyContent: 'center',
      },
      '& li button:hover': {
        color: theme.palette.secondary.main,

      },
      Title: {
        display: 'flex',
        flexDirecton: 'column',
      }

    }
  
}));


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

const[slide, setSlide]=useState(true);
const[slideMessage, setSlideMessage]=useState('Van idee naar 3D')



return (
<AppBar position="static" className={classes.root} >
  
  <Toolbar className={classes.toolbar}>
  {matches ? <img className={classes.images} src='/logo.png' alt='logo'></img> : ''}

   {matches ?  <div className={classes.Title}>
   <Typography variant="h2" >
      3D-PrintDomain    
      
    </Typography>

      <Typography variant='h6' align='center' >{slideMessage} </Typography>

</div>
    : '' }

    <nav>
          <ul className={classes.Navigation}>

              
              {data.cart ? 
              <Menu 
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              >
              {data.cart.map( (object,i) =>
                
                <MenuItem onClick={handleClose} key={i}>
                  <Typography >{object.print.name} X {object.quantity} = </Typography>
                  <Typography color='secondary'>{currencyFormat(object.print.currentPriceValue * object.quantity)}</Typography>
                </MenuItem>
                ) }
                <MenuItem onClick={handleClose}>Items: {CartTotal} </MenuItem>
                <MenuItem onClick={handleClose}>Total:{currencyFormat(data.cart
                .map((object) => object.print.currentPriceValue * object.quantity)
                .reduce((a, b) => a + b, 0))} </MenuItem>
                   <MenuItem onClick={handleClose}>                
                   <Link to="/shopping-cart">
                  <Button color='secondary'>
                Place order : 
              <ShoppingCartIcon />
              </Button></Link>    </MenuItem>
   

              </Menu>
            : 
           <p> Nothing in the basket yet!
           Try clicking a shopping cart icon.</p>
            
            }

<li>
              <Button>
              <Link to="/">
                <HomeIcon fontSize='large'/>
              </Link>
              </Button>
            </li>


            <li>
              <Button>              
                <Badge>
              {localStorage.getItem('token')?
              <Link to="/profile">             
              <AccountCircleIcon fontSize='large'/>
            </Link>
            :
            <Link to="/login">
            <AccountCircleIcon fontSize='large'/>
              </Link>
            }

            </Badge>
            </Button>

            </li>

            <li>     <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}> 
   
   <Badge 
    badgeContent={CartTotal}
    color="secondary">
        <ShoppingCartIcon fontSize='large'/>
      </Badge>
</Button></li>  
            <li><Button onClick={() => checker()}>  <SettingsIcon fontSize='large' /></Button>
              
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