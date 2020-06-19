import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCarousel, advanceCarousel, maxCarousel } from "../data/carousel";
import { getObject } from "../data/object";
import {currencyFormat} from '../helpers/moneyconvert'
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Box,
  Chip,
  CardMedia,
  Paper,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import { pushItemToCart } from "../data/shoppingcart";

export default (props) => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => ({
    object: state.object,
    carousel: state.carousel,
  }));
  const { object } = Data;
  const { carousel } = Data;


  useEffect(() => {
    dispatch(getObject(props.match.params.id));
  }, []);

  const useStyles = makeStyles({
    root: {
      marginTop: "3rem",
      marginLeft: "3em",
      display: "flex",
    },
    width: {
      width : '100%',
    },
    images: {
      display: "flex",
      flexDirection: "row",
      flexFlow: "wrap",
      borderTop: "1px solid grey",
      marginTop: "3px",
    },
    headimage: {},
    slider: {
      width: "80px",
      height: "80px",
      marginRight: '2px',
    },
    carousel: {
      display: "flex",
      flexDirection: "column",
      width: "40%",
      padding: "1em",
      border: "1px solid grey",
    },
    panel: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      textAlign: "center",
      color: "grey",
      marginTop: "1em",
    },
    money: {
      padding: '1em',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',

    }
  });
  const classes = useStyles();

  return (
<>
    <Container maxWidth="l">
      <Typography className={classes.title} variant="h3">
        {object.data.name}
      </Typography>
      <Paper className={classes.root}>
        <div className={classes.carousel}>

          {object.data.images  ? (
            <CardMedia
              onClick={() =>
                dispatch(
                  advanceCarousel(
                    object.data.images.length ? object.data.images.length : 1
                  )
                )
              }
              className={classes.headimage}
              component="img"
              image={
  
                process.env.REACT_APP_BASE_PATH +
                object.data.images[ carousel+1 > object.data.images.length ?  0 : carousel].path
              }
              maxHeight="50px"
            />
          ) : (
            <Box pt={0.5}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={"100%"}
              height={250}
              style={{ marginBottom: 6 }}
            /></Box>
          )}

          <div className={classes.images}>
            {(object.data.images ? object.data.images : Array.from(new Array(3))).map((image, i) => (
                object.data.images ? 
                  <CardMedia
                    onClick={() => dispatch(setCarousel(i))}
                    className={classes.slider}
                    title={image.name}
                    image={process.env.REACT_APP_BASE_PATH + image.path}
                    component="img"
                  />
                
               :
              
                <Box pt={0.5}>
                <Skeleton
                  className={classes.slider}
                  animation="wave"
                  variant="rect"
                  style={{ marginBottom: 6 }}
                />
                </Box>
              ))
              }

          </div>
        </div>
        
        
        <Container className={classes.panel}>
       

          <ul>
            {object.data.Categories
              ? object.data.Categories.map((category) => (
                <Chip

                label={category.name}
                clickable={true}
                color="secondary"
              />
                ))
              : "Loading"}
          </ul>

        
          {object.data.printTime ? 
          <div>
          <Typography variant="h5">
            Print-time : {object.data.printTime}
          </Typography>
          <Typography variant="h5"> Size: {object.data.size} </Typography>
          <Typography variant="h5"> {object.data.description}</Typography>
          </div>
          :
          <div className={classes.width}>
          <Skeleton animation="wave" height={16} width={'100%'} />
          <Skeleton animation="wave" height={12} width={'100%'} />
          <Skeleton animation="wave" height={17} width={'100%'} />
          <Skeleton animation="wave" height={20} width={'100%'} />
          </div>}
          
        </Container>

    <Typography gutterBottom variant="h5" color="secondary" className={classes.money}>
                {object ? (
                  <Button onClick={() => dispatch(pushItemToCart(object.data))}>
                    <AddShoppingCartIcon fontSize={'large'} />
                  </Button>
                ) : (
                  <AddShoppingCartIcon fontSize={'large'} color="disabled" />
                )}
                {object.data.currentPriceValue ? (
                  currencyFormat(object.data.currentPriceValue)
                ) : (
                  <Skeleton animation="wave" height={14} width={'100%'} />
                )}

              </Typography>

      </Paper>
    </Container>

              </>
  );
};
