import React from 'react';
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


function App() {
  return (
    <Provider store={store} > 
    <Router>
    <Header/>
    <div className='partager'>
    <Sidebar/>

    <Switch>

    <Route path='/login'>
      <Login/>
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

    </Switch>
    </div>
    </Router>
      <Footer/>
    </Provider> 
  );
}

export default App;
