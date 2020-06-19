import React,{useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
import TEST from './components/TEST'
import Orders from './components/Orders'





function App() {

  const [checked, setChecked] = useState(false);

const handleChange = () => {
  setChecked((prev) => !prev);
};


  return (
    <Provider store={store} > 
    <Router>
    <Header checker={handleChange} checked={checked}/>
    <div className='partager'>


    <Switch>

    <Route path='/login'>
      <Login/>
    </Route>

    <Route path='/orders'>
      <Orders/>
    </Route>

    <Route path='/profile'>
      <Profile/>
    </Route>

    <Route exact path="/" >
      <Landing/>
    </Route>
    <Route path="/wdev_arno/eindwerk/api/objects/:id/:title" render={(props)=> <Detail {...props}/>}/>   

    <Route path='/shopping-cart'>
      <Shoppingcart/>
    </Route>
    <Route path='/test'>
      <TEST/>
    </Route>

    </Switch>
    <Sidebar checked ={checked} checker={handleChange}/>
    </div>
    </Router>
      <Footer/>
    </Provider> 
  );
}

export default App;
