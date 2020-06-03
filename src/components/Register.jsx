import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core"

export default () => {

    const useStyles = makeStyles({
        flex: {
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around'
        },
        form: {
          marginTop: '5em',
          padding: "0 3em",
          width:'30%',
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
      
        },
      
        loginForm: {
          borderTop: '20px solid pink',
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
            background: 'pink',
            color: '#921002',
            fontWeight: 'bolder',
        },
        Title:{
            color: '#921002',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1em'
        }
      
      });
      




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
            console.log(res)
            
            
             
          })
    }
    



return (
<div className={classes.form}>
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
      
)
    }