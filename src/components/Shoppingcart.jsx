import React, {  useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CardMedia from "@material-ui/core/CardMedia";
import {
  removeItemFromCart,
  setObjectQuantity,
  clearShoppingCart,
} from "../data/shoppingcart";
import {

  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import axios from "axios";
import { currencyFormat } from "../helpers/moneyconvert";
import { ToastDashMessage } from "../data/snackbar";
import { regexValidateNumber, regexvalidate } from "../helpers/validation";

export default () => {


  const useStyles = makeStyles((theme) => ({
    root: {
      width: "80%",
      marginTop: "3rem",
      marginLeft: "3em",
    },
    divider: {
      marginTop: "3rem",
      marginBottom: "3em",
      width: "100%",

      display: "flex",
      flexDirection: "column",
    },
    form: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      color: "grey",
      "& form": {
        borderTop: `20px solid ${theme.palette.secondary.detail}`,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",

        "& button": {
          padding: "1em",
          background: theme.palette.secondary.detail,
          color: theme.palette.secondary.main,
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
      borderTop: `20px solid ${theme.palette.secondary.detail}`,
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
    button: {
      color: theme.palette.secondary.main,
      background: theme.palette.secondary.detail,
    },
  }));
  const dispatch = useDispatch();
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [postcode, setPostcode] = useState("");

  const data = useSelector((state) => ({
    objects: state.objects,
    filter: state.filters,
    cart: state.shoppingcart,
  }));
  const { cart } = data;

  const classes = useStyles();

  const validateShipping = () => {
    if (regexvalidate(number) === false) {
      dispatch(ToastDashMessage("Input a valid number please", "error"));
      return false;
    }
    if (regexvalidate(street) === false) {
      dispatch(ToastDashMessage("input a valid streetname please", "error"));
      return false;
    }
    if (regexvalidate(postcode) === false) {
      dispatch(ToastDashMessage("input a valid postcode please", "error"));
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (localStorage.getItem && validateShipping()) {
      sendOrder(shippingmessage);
    }
    return null;
  };

  let shippingmessage = JSON.stringify({
    status: "Received",
    shippingAdress: street + number + postcode,
    details: cart.map((object) => ({
      quantity: parseInt(object.quantity),
      objectStatus: "status",
      objects: object.print["@id"],
    })),
  });

  const sendOrder = (data) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}orders`,
      headers: {
        "Content-Type": "application/ld+json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // TODO Localstorage token
      },
      data: data,
    })
      .then((res) => {
        dispatch(clearShoppingCart());
        dispatch(
          ToastDashMessage(
            "Order placed! Thank you for your purchase!",
            "success"
          )
        );
      })
      .catch((reject) => {
        dispatch(
          ToastDashMessage(
            "Something went wrong, try again at a later moment",
            "error"
          )
        );
      });
  };
  //onchange change state with valueof input

  const submithandler = (e) => {
    e.preventDefault();

    if (regexValidateNumber(e.target[0].value) === false) {
      dispatch(ToastDashMessage("please only input numbers", "error"));
    } else {
      dispatch(setObjectQuantity(e.target[0].name, e.target[0].value));
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        {cart.map((object, i) => (
          <ExpansionPanel className={classes.panel} key={i}>
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className={classes.test}>
                <div className={classes.heading}>
                  <Typography variant="h4">{object.print.name}</Typography>
                  {currencyFormat(object.print.currentPriceValue)} X
                  <form onSubmit={submithandler}>
                    <input
                      name={object.print["@id"]}
                      placeholder={object.quantity}
                    ></input>
                    <Button className={classes.button} type="submit">
                      Change
                    </Button>
                  </form>
                  {currencyFormat(
                    object.print.currentPriceValue * object.quantity
                  )}
                </div>
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
                    maxheight="50px"
                  />
                </div>
              </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <Typography
                dangerouslySetInnerHTML={{ __html: object.print.description }}
              ></Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Paper>

      <div className={classes.divider}>
        <Paper className={classes.form}>
          <form onSubmit={submitHandler}>
            <Typography variant="h3"> Shopping Cart</Typography>
            <h2> Items in cart: {cart.length}</h2>

            <Typography variant="h4">
              {"Total : "}

              {currencyFormat(
                cart
                  .map(
                    (object) => object.print.currentPriceValue * object.quantity
                  )
                  .reduce((a, b) => a + b, 0)
              )}
            </Typography>
            {localStorage.getItem("token") && cart.length > 0 ? (
              <Button type="submit">Order now</Button>
            ) : (
              <>
                <Button type="submit" disabled>
                  {"Log in/ Fill basket"}
                </Button>
                <Link to={{ pathname: `/login` }}> Go to Login</Link>
              </>
            )}
          </form>
        </Paper>
        <Paper className={classes.form}>
          <h2> Shipping: </h2>
          <p>
            If you want the order to be shipped to a different location fill in
            this form!
          </p>
          <label htmlFor="inputfield"> Street:</label>
          <input
            name="inputfield"
            type="text"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
          <label htmlFor="inputfield"> Number:</label>
          <input
            name="inputfield"
            type="text"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <label htmlFor="inputfield"> Postcode:</label>
          <input
            name="inputfield"
            type="text"
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value);
            }}
          />
          <Typography>Shipping fee : €5</Typography>
          <Typography> Free shipping on orders higher than €30...</Typography>
        </Paper>
      </div>
    </>
  );
};
