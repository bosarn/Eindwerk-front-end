import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core"
import {ToastDashMessage} from '../data/snackbar'
import {useDispatch} from 'react-redux'


export default () => {

    const useStyles = makeStyles( theme => ({
        flex: {
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around'
        },
        spacer:{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '70%'
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
    }
      
      }));
      


const dispatch=useDispatch();

const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
          setError('error')
          return null;
        }
        registeruser(email, password , userName);
      };
    

    const registeruser = ( email, password, userName) => {
        axios({
            method: 'post',
            url: 'https://wdev.be/wdev_arno/eindwerk/api/register',
            headers: { 
                'Content-Type' : 'application/json'
            }, 
            data: {
              "email" : email,
              "password" : password,
              "name": userName
            }
          })
          .then(
            res => {
              dispatch(ToastDashMessage('Registered account', 'success'))
            
            
             
          })
    }
    



return (
<div className={classes.form}>
  <div className={classes.spacer}>
<h1 className={classes.Title}> Register </h1>
      <form onSubmit={submitHandler} className={classes.loginForm}>
      <h2 className={classes.Title}>E-mail:</h2>
          <input  
          
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
        <h2 className={classes.Title}>Name:</h2>
          <input  
          
          onChange={(e) => {setUserName(e.target.value)
            setError('') }}
          type="text" 
          className ={classes.inputField}
          value= {userName}/>   

        <h2 className={classes.Title}>Adress:</h2>
          <input  
          
          onChange=''
          type="text" 
          className ={classes.inputField}
          value= ''/>      
                 <h2 className={classes.Title}>Number:</h2>
          <input  
          
          onChange=''
          type="text" 
          className ={classes.inputField}
          value= ''/>   
        <h2 className={classes.Title}>Other:</h2>
          <input  
          
          onChange=''
          type="text" 
          className ={classes.inputField}
          value= ''/>         
          <Button 
          className={classes.button}
          type="submit">
            Register
            </Button>    
      </form>
      </div>
      </div>
      
)
    }