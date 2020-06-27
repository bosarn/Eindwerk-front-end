import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField, Typography} from "@material-ui/core"
import {ToastDashMessage} from '../data/snackbar'
import {useDispatch} from 'react-redux'
import {regexvalidate} from '../helpers/validation'

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
    const [address,setAddress] = useState('')
    const [surname,setSurname] = useState('')
    const [number, setNumber] = useState('')
    const [postcode, setPostcode] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(regexvalidate(userName, 1))


        if (regexvalidate(userName, 1) === false) {
          setError('Username is too short or has forbidden characters!')
          dispatch(ToastDashMessage('Username is too short or has forbidden characters', 'warning'))
          return null;
        }
        if( regexvalidate(password, 8)=== false){
          setError('Password is too short!')
          dispatch(ToastDashMessage('Password is too short', 'warning'))
          return null;
        }
        if( email=== ''){
          setError('please input an email address!')
          dispatch(ToastDashMessage('please input an email address!', 'warning'))
          return null;
        }
        if( regexvalidate(address, 1)=== false && regexvalidate(number, 1) ){
          setError('please input a valid address!')
          dispatch(ToastDashMessage('please input a valid address!', 'warning'))
          return null;
        }
        if( regexvalidate(postcode, 1)=== false){
          setError('please input a valid postcode')
          dispatch(ToastDashMessage('postcode is wrong!', 'warning'))
          return null;
        }
        registeruser(email, password , userName, address, surname, number,postcode);
      };
    

    const registeruser = ( email, password, userName,address, surname, number, postcode) => {
        axios({
            method: 'post',
            url: 'https://wdev.be/wdev_arno/eindwerk/api/register',
            headers: { 
                'Content-Type' : 'application/json'
            }, 
            data: {
              "email" : email,
              "password" : password,
              "name": userName,
              "address": address,
              "postcode" : postcode,
              "surname": surname,
              "number": number,
            }
          })
          .then(
            res => {
              dispatch(ToastDashMessage('Registered account', 'success'))
            

          })
    }
   // seterror , plus dispatch toast errormessage 



return (
<div className={classes.form}>
<Typography align='center'> {error} </Typography>
  <div className={classes.spacer}>
<h1 className={classes.Title}> Register </h1>
      <form onSubmit={submitHandler} className={classes.loginForm}>
      <h2 className={classes.Title}>E-mail:</h2>
          <TextField  
          
          onChange={(e) => { setEmail(e.target.value)
                              setError('')}} 
          type="text" 
          className ={classes.inputField}
          color='secondary'
          value= {email}/>      

          <h2 className={classes.Title}>Password:</h2>
          <TextField   
          onChange={(e) => {setPassword(e.target.value)
                            setError('') }}
          name="password" 
          type="password"
          color='secondary'
          className ={classes.inputField }
          value={password}
          /> 
        <h2 className={classes.Title}>Name:</h2>
          <TextField  
          
          onChange={(e) => {setUserName(e.target.value)
            setError('') }}
          type="text" 
          color='secondary'
          className ={classes.inputField}
          value= {userName}/>   

            <h2 className={classes.Title}>Surname</h2>
            <TextField 
              onChange={(e) => {setSurname(e.target.value)
                setError('')}} 
              type="text"
              className={classes.inputField}
              value={surname}
              color='secondary'
            />
            <h2 className={classes.Title}>Street</h2>
            <TextField 
              onChange={(e) => {setAddress(e.target.value)
                setError('')}} 
              type="text"
              className={classes.inputField}
              value={address}
              color='secondary'
            />
            <h2 className={classes.Title}>Number</h2>
            <TextField 
              onChange={(e) => {setNumber(e.target.value)
                setError('')}} 
              type="text"
              className={classes.inputField}
              value={number}
              color='secondary'
            />
              <h2 className={classes.Title}>Postcode</h2>
            <TextField 
              onChange={(e) => {setPostcode(e.target.value)
                setError('')}} 
              type="text"
              className={classes.inputField}
              value={postcode}
              color='secondary'
            />
            
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