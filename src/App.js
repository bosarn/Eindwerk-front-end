import React,{useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";
import Login from './components/login';
import Landing  from "./components/landing"
import Header from './components/header'
import store from "./data";
import Sidebar from './components/sidebar'
import Footer from './components/Footer'
import Detail from './components/Detail'
import Shoppingcart from './components/Shoppingcart';
import Profile from './components/Profile'
import Categories from './components/Categories'
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors/';
import { ThemeProvider } from '@material-ui/core/styles';
import Register from "./components/Register"
import Snackbar from './components/Snackbar'

function App() {

  const [checked, setChecked] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: red[500],
        detail: '#ddd'
      },
      secondary: {
        detail: '#263238',
        main: '#607d8b'
      }
    },
    status: {
      danger: 'orange',
    },
  });

const handleChange = () => {
  setChecked((prev) => !prev);
};



  return (
    <Provider store={store} > 
    <ThemeProvider theme ={theme}>
    <Router>
      <Snackbar/>
    <Header checker={handleChange} checked={checked}/>
    <div className='partager'>


    <Switch>

    <Route path='/login'>
      <Login/>
      <Register/>
    </Route>


    <Route path='/profile'>
      <Profile/>
    </Route>

    <Route exact path="/" >
      <div className='flexcol'>
      <Landing/>
      <Categories/>
      </div>
    </Route>
    <Route path="/wdev_arno/eindwerk/api/objects/:id/:name" render={(props)=> <Detail {...props}/>}/>   

    <Route path='/shopping-cart'>
      <Shoppingcart/>
    </Route>


    </Switch>
    <Sidebar checked ={checked} checker={handleChange}/>
    </div>
    </Router>
      <Footer/>
      </ThemeProvider>
    </Provider> 
  );
}

export default App;
