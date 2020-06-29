import React from "react";
import {
  Typography,
  Paper,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default (data) => {
  const useStyles = makeStyles((theme) => ({
    Order: {
      marginTop: "3em",
      width: "100%",
    },
    panel: {
      marginLeft: "auto",
      marginRight: "auto",
      borderTop: `20px solid ${theme.palette.secondary.detail}`,
      display: "flex",
      flexDirection: "column",
      width: "70%",
    },
    orderdetails: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  return (
    <>
      {data ? (
        <Paper className={classes.Order}>
          <ul>
            {data.data.orders.map((orders, i) => (
              <li key={i}>
                <ExpansionPanel className={classes.panel}>
                  <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className={classes.orderdetails}>
                      <Typography variant="h5" align="center">
                        Orderdate: {orders.date.slice(0, 10)}
                      </Typography>
                    </div>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <ul>
                      <li>
                        
                        <Typography variant="body1" align="center">
                         
                          <strong>Your order status :</strong>
                          {orders.status}
                        </Typography>
                      </li>
                      <li>
                        
                        <Typography variant="body1" align="center">
                          
                          <strong>Shipping to : </strong>
                          {orders.shippingAdress
                            ? orders.shippingAdress
                            : `${data.data.address}  ${data.data.Streetnumber}  ${data.data.postcode}`}
                        </Typography>
                      </li>

                      <li>
                        <Typography variant="body1" align="center">
                         
                          <strong>Order made :</strong> {orders.date}
                        </Typography>
                      </li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </li>
            ))}
          </ul>
        </Paper>
      ) : (
        <Paper className={classes.Order}>
          <Typography align="center">
           
            Empty... Please shop for items and click the shopping cart icon to
            place an order
          </Typography>
        </Paper>
      )}
    </>
  );

};
