import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Typography, TextField, CircularProgress } from "@material-ui/core";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import {getOrders} from '../data/orders'
import axios from 'axios';
import { ToastDashMessage } from "../data/snackbar";

export default () => {
  const useStyles = makeStyles((theme) => ({
    flex: {
      display: "flex",
      width: "100%",
      justifyContent: "space-around",
    },
    form: {
      marginTop: "3em",
      width: "100%",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    formmakeup: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "80%",
      borderTop: `20px solid ${theme.palette.secondary.detail}`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      border: "1px solid grey",
    },
    inputField: {
      color: "grey",
      width: "50%",
      textAlign: "center",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: "1em",
    },
    button: {
      background: theme.palette.secondary.detail,
      color: theme.palette.secondary.main,
      fontWeight: "bolder",
    },
    Title: {
      color: theme.palette.secondary.main,
      display: "flex",
      justifyContent: "center",
      fontSize: "1em",
    },
    loading: {
      position: "absolute",
      marginLeft: "50%",
      marginTop: "50vh",
      color: theme.palette.secondary.detail,

    },
  }));
  const data = useSelector((state) => ({
    orders: state.orders,
  }));

  const dispatch = useDispatch();

useEffect(() => {
    dispatch(getOrders());
  }, []);

  const classes = useStyles();


   
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [address,setAddress] = useState('')
  const [surname,setSurname] = useState('')
  const [verwijder,setVerwijder] = useState(false)
  const [number, setNumber] = useState('')
  const [postcode, setPostcode] = useState('')

//any hook that is set is used, any that is false is left alone

const submitHandler = (e) => {
  e.preventDefault();
   if (name === ""){setName(data.orders.data["hydra:member"][0].name)}
   if (password === ''){setPassword(data.orders.data["hydra:member"][0].name)}
   if (address === ''){setAddress(data.orders.data["hydra:member"][0].address)}
   if (surname === ''){setSurname(data.orders.data["hydra:member"][0].surname)}
   if (number === ''){setNumber(data.orders.data["hydra:member"][0].number)}
   if (postcode === ''){setPostcode(data.orders.data["hydra:member"][0].postcode)}


    else if (name !== "") {

    putUser();
  }

};

const putUser = () => {
  axios({
      method: 'put',
      url: `https://wdev.be/wdev_arno/eindwerk${data.orders.data["hydra:member"][0]['@id']}`,
      headers: { 
          'Content-Type' : 'application/json',
          Authorization:
          `Bearer ${localStorage.getItem('token')}`},
      data: {
            name: name,
            
      }
    })
    .then(
      res => {
        if (verwijder === true) {
          dispatch(ToastDashMessage('U werd kapotgemaakt!', 'warning'))
        }
        else {
        dispatch(ToastDashMessage('Changing user account details, thank you ', 'info'))
        };

    })
    .catch(
      reject => {
        dispatch(ToastDashMessage('Something went wrong, Are you logged in or a Hackerman?', 'error'))
      }
    )
}

// email password name surname street number  postcode 
  return (
    <>
      <Paper className={classes.form}>
        <h1 className={classes.Title}> Change user details </h1>
        
        {data.orders.data["hydra:member"] ? (
          <form className={classes.formmakeup} onSubmit={submitHandler}>

            <h2 className={classes.Title}>Mail address</h2>

            <TextField 
              className={classes.inputField}
              placeholder={data.orders.data["hydra:member"][0].email}
              color='secondary'
            />

            <h2 className={classes.Title}>Password</h2>
            <TextField 
              name="password"
              type="password"
              className={classes.inputField}
              color='secondary'
            />
            <h2 className={classes.Title}>Name</h2>
            <TextField 
            placeholder={data.orders.data["hydra:member"][0].name}
            onChange={(e) => {setName(e.target.value)}} 
            type="text" 
            className={classes.inputField}
            color='secondary' 
            value={name}/>

            <h2 className={classes.Title}>Surname</h2>
            <TextField 
              onChange={(e) => {setSurname(e.target.value)}} 
              type="text"
              className={classes.inputField}
              value={surname}
              placeholder={data.orders.data["hydra:member"][0].surname}
              color='secondary'
            />
            <h2 className={classes.Title}>Street</h2>
            <TextField 
              onChange={(e) => {setAddress(e.target.value)}} 
              type="text"
              className={classes.inputField}
              placeholder={data.orders.data["hydra:member"][0].address}
              value={address}
              color='secondary'
            />
            <h2 className={classes.Title}>Number</h2>
            <TextField 
              onChange={(e) => {setNumber(e.target.value)}} 
              type="text"
              className={classes.inputField}
              value={number}
              color='secondary'
            />
              <h2 className={classes.Title}>Postcode</h2>
            <TextField 
              onChange={(e) => {setPostcode(e.target.value)}} 
              type="text"
              className={classes.inputField}
              value={postcode}
              color='secondary'
            />

            <div className={classes.inputField}>
              {" "}
              <Button className={classes.button} type="submit" >
                Change details
              </Button>
              <Button color="primary" variant="contained" type="submit" onClick={()=>setVerwijder(true)}>
                delete
              </Button>{" "}
            </div>
          </form>
        ) : (
          <CircularProgress
          className={classes.loading}
          display={"block"}
          size={100}            
        />
        )}

      </Paper>
      {data.orders.data["hydra:member"] ? 
      <Orders data={data.orders.data["hydra:member"][0].orders}/> :' '}
    </>
  );
};
