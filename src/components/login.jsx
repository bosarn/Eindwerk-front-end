import React from 'react';
import {useState} from 'react'
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import {Button,Typography} from "@material-ui/core"
import {ToastDashMessage} from '../data/snackbar'
import {useDispatch} from 'react-redux'



const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around'
  },
  spacer:{
    width: '70%',
    marginRight: 'auto',
    marginLeft: 'auto',
},
  form: {
    marginTop: '5em',
    width:'100%',
    position: "relative",
    justifyContent: "center",
    alignItems: "center",

  },

  loginForm: {
    borderTop: `20px solid ${theme.palette.secondary.detail}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: '1px solid grey',
  },
  inputField: {
    color: 'grey',
    width: '50%',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '1em'

  },
  button:{
      background: theme.palette.secondary.detail,
      color: theme.palette.secondary.main,
      fontWeight: 'bolder',
  },
  Title:{
      color: theme.palette.secondary.main,
      display: 'flex',
      justifyContent: 'center',
      fontSize: '1em'
  },
  logout: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    paddingTop: '3em'
  }

}));


export default () => {
const classes = useStyles();
const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
          setError('error')
          return null;
        }
        loginUser(email, password);
      };
    

    const loginUser = ( email, password) => {
        axios({
            method: 'post',
            url: 'https://wdev.be/wdev_arno/eindwerk/api/login',
            headers: { 
                'Content-Type' : 'application/json' 
            }, 
            data: {
              "username" : email,
              "password" : password
            }
          })
          .then(
            res => {
            dispatch(ToastDashMessage('Login Successfull', 'success'))
            const webToken = res.data.token
            localStorage.setItem('token', webToken);
          })
    }
    const logout=(e)=>{
      e.preventDefault()
      localStorage.removeItem('token')
      dispatch(ToastDashMessage('Logged out ', 'info'))
    
  }

    return (

<div className={classes.form}>
  <div className={classes.spacer}>
  <h1 className={classes.Title}> Log in </h1>
        <form onSubmit={submitHandler} className={classes.loginForm}>
        <h2 className={classes.Title}>E-mail:</h2>
            <input  
            name='formforemailinput' 
            onChange={(e) => { setEmail(e.target.value)
                                setError('')}} 
            type="text" 
            className ={classes.inputField}
            value= {email}/>      

            <h2 className={classes.Title}>Password:</h2>
            <input   
            onChange={(e) => {setPassword(e.target.value)
                              setError('') }}
            name="password" 
            type="password"
            className ={classes.inputField }
            value={password}
            /> 
            
            <Button 
            className={classes.button}
            type="submit">
              Log in
              </Button>    
        </form>
        <div className={classes.logout}>
        <Typography align='center'>If you wish to log out:</Typography>
        <Button className={classes.button} onClick={logout}> log out</Button>
        </div>
        </div>
</div>

    );
}