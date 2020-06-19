import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getObjects } from "../data/objects";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getObject } from "../data/object";
import CardMedia from "@material-ui/core/CardMedia";
import {
  removeItemFromCart,
  setObjectQuantity,
  clearShoppingCart,
} from "../data/shoppingcart";
import {
  Container,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import axios from "axios";
import {currencyFormat} from '../helpers/moneyconvert'

export default () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => ({
    objects: state.objects,
    filter: state.filters,
    cart: state.shoppingcart,
  }));
  const { cart } = data;

  const useStyles = makeStyles({
    root: {
      width: "40%",
      marginTop: "3rem",
      marginLeft: "3em",
    },
    divider: {
      marginTop: "3rem",
      marginRight: "3em",
      width: "40%",
      padding: "0 3em",
      display: "flex",
      flexDirection: "column",
    },
    form: {
      justifyContent: "center",
      alignItems: "center",

      display: "flex",
      flexDirection: "column",
      color: "grey",
      "& form": {
        borderTop: "20px solid pink",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",

        "& button": {
          padding: "1em",
          background: "pink",
        },
      },
    },
    img: {
      height: "100px",
      width: "100px",
      border: "1px solid grey",
      display: "block",
    },
    panel: {
      borderTop: "20px solid pink",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    test: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    if (localStorage.getItem) {
      dispatch(clearShoppingCart());
      sendOrder(shippingmessage);

    }
    return null;
  };

  let shippingmessage = JSON.stringify({
    description: "origin site real data",
    status: "sent",
    shippingAdress: "if is set with hook input else leave blank",
    details: cart.map((object) => ({
      quantity: object.quantity,
      objectStatus: "status",
      objects: object.print["@id"],
    })),
  });

  const sendOrder = (data) => {
    console.log(localStorage.getItem('token'))
    axios({
      
      method: "post",
      url: `${process.env.REACT_APP_API_URL}orders`,
      headers: {
        "Content-Type": "application/ld+json; charset=utf-8",
        Authorization:
          `Bearer ${localStorage.getItem('token')}`,
        // TODO Localstorage token
      },
      data: data,
    }).then((res) => {
      console.log(res);
      // check if retur is 200 or something
      // else seterror
      // empty shopping cart
      //redirect
      // setmessage popup
    });
  };
  //onchange change state with valueof input

  return (
    <>
      <Paper className={classes.root}>
        {cart.map((object) => (
          <>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className={classes.test}>
                  <Typography className={classes.heading}>
                    <h4>{object.print.name}</h4> {currencyFormat(object.print.currentPriceValue)} X
                    <form>
                      <input
                        onChange={(e) =>
                          dispatch(
                            setObjectQuantity(
                              object.print["@id"],
                              e.target.value
                            )
                          )
                        }
                        placeholder={object.quantity}
                      ></input>
                    </form>
                    {currencyFormat(object.print.currentPriceValue * object.quantity)}
                  </Typography>
                  <div>
                    <Button
                      onClick={() => dispatch(removeItemFromCart(object.print))}
                    >
                      <RemoveShoppingCartIcon />
                    </Button>
                    <CardMedia
                      className={classes.img}
                      image={
                        process.env.REACT_APP_BASE_PATH +
                        object.print.images[0].path
                      }
                      component="img"
                      maxHeight="50px"
                    />
                  </div>
                </div>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails>
                <Typography>
                  Size: {object.print.size} <br></br>
                  Description :
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        ))}
      </Paper>

      <div className={classes.divider}>
        <Paper className={classes.form}>
          <form onSubmit={submitHandler}>
            <Typography variant="h3"> Shopping Cart</Typography>
            <h2> Items in cart: {cart.length}</h2>

            <Typography variant="h4">
              {"Total : "}
              
              {currencyFormat(cart
                .map((object) => object.print.currentPriceValue * object.quantity)
                .reduce((a, b) => a + b, 0))}
            </Typography>
            {localStorage.getItem("token") && cart.length > 0 ? (
              <Button type="submit">Order now</Button>
            ) : (
              <Button type="submit" disabled>
                {" "}
                Log in/ Fill basket
              </Button>
            )}
          </form>
        </Paper>
        <Paper className={classes.form}>
          <h2> Shipping: </h2>
          <label for="inputfield"> Change Shipping adress:</label>
          <input name="inputfield" type="text" />
          <Typography>Shipping fee : $5</Typography>
          <Typography>
            {" "}
            Free shipping on orders higher than a kite...
          </Typography>
        </Paper>
      </div>
    </>
  );
};

//check if token alive?
// bearer token : JWT
// POST => api/orders
// send token
// make up order details from state
