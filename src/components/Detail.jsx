import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCarousel, advanceCarousel, maxCarousel } from "../data/carousel";
import { getObject } from "../data/object";
import {currencyFormat} from '../helpers/moneyconvert'
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {ToastDashMessage} from '../data/snackbar'
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

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      width: '100%',
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
    headimage: {width: '100%'},
    slider: {
      
      width: "80px",
      height: "80px",
      marginRight: '2px',
      '&:hover' : {
          border: `2px solid ${theme.palette.secondary.main}`
      },
    },
    carousel: {
      display: "flex",
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: "column",
      width: "60%",
      padding: "1em",
    },
    panel: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      marginTop: '3em',
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

    },
    description :{
      width: '100%',
      marginTop: '3em',
      borderTop: '1px solid grey',
    },
    descriptiontext: {
      display: 'flex',
      flexDirection: 'column'
    }
  }));
  const classes = useStyles();

  const BuyOneItem = (payload) =>{
    dispatch(pushItemToCart(payload))
    dispatch(ToastDashMessage(`${payload.name} added to the shopping cart`, 'info'))

}

  return (
<>


      <Paper className={classes.root}>
        
        <div className={classes.carousel}>
        <Typography className={classes.title} variant="h3" align='center'>
        {object.data.name}
      </Typography>
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
              image={ 'https://wdev.be/wdev_arno/eindwerk/system/public' +
              object.data.images[ carousel+1 > object.data.images.length ?  0 : carousel].path

              }

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
                    key={i}
                    onClick={() => dispatch(setCarousel(i))}
                    className={classes.slider}
                    title={image.name}
                    image={ `https://wdev.be/wdev_arno/eindwerk/system/public${image.path}`}
                    component="img"
                  />
                
               :
              
                <Box pt={0.5} key={i}>
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
        </Paper>
        
        <Container className={classes.panel}>
        <Typography className={classes.title} variant="h4" align='center'>
        {object.data.name}
      </Typography>



        

          <Typography gutterBottom variant="h5" color="primary" className={classes.money}>
                {object ? (
                  <Button onClick={() => BuyOneItem(object.data)}>
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
                <Paper className={classes.description}>
                  
                {object.data.description ? 
                <Typography variant="h5" align='center' className={classes.descriptiontext} dangerouslySetInnerHTML={{__html: object.data.description}} ></Typography> : 'There is no description at the time, apologies!' }

                </Paper>
                {object.data.size ? 
          <div>

          <Typography variant="h5"> Size: {object.data.size} </Typography>

          </div>
          :
          <div className={classes.width}>
          <Skeleton animation="wave" height={16} width={'100%'} />
          <Skeleton animation="wave" height={12} width={'100%'} />
          <Skeleton animation="wave" height={17} width={'100%'} />
          <Skeleton animation="wave" height={20} width={'100%'} />
          </div>}
        </Container>



              </>
  );
};


/**
 *   
                `https://wdev.be/wdev_arno/eindwerk/image.php/${object.data.images[0].path}?width=550&height=550&cropratio=1:1&image=https://wdev.be/wdev_arno/eindwerk/public` +
                object.data.images[ carousel+1 > object.data.images.length ?  0 : carousel].path
 */