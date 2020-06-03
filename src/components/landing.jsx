import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button, CircularProgress } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getObjects } from "../data/objects";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {pushItemToCart} from "../data/shoppingcart"
import { findByLabelText } from "@testing-library/react";




export default () => {
  const dortor = useSelector((state) => ({
    objects: state.objects,
    filter: state.filters,
  }));

  const { error, loading, data } = dortor.objects;
  const { filter } = dortor;
  const dispatch = useDispatch();

    

    useEffect(() => {
      dispatch(getObjects());
    }, [dispatch]);
  

 
  const useStyles = makeStyles({
    root: {
      background:
        "linear-gradient(0deg, rgba(255,0,0,.3), rgba(255,0,0,0) 70.71%)",
      padding: "5px",
      width: "300px",
    },
    button: {
      marginLeft: "50%",
    },
    container: {
      marginTop: "4rem",
    },
    link: {
      textDecoration: 'none'
    },

  });

  const classes = useStyles();

  // Filter data by filterstate , then map all data into the  html

  // array of categories per object
  // filterfunction checks if object has certain categories
  // filterarray.includes( category.name)
  let filterArray = filter.filters;
  let filteredobjects = data;

  if (filterArray.length !== 0) {
    filteredobjects = data.filter((object) =>
      object.Categories.some((category) => filterArray.includes(category.name))
    );
  }


  return (
    <>
      {error !== "" && <p>{error}</p>}
       
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.container}
      >
{loading && <CircularProgress size='100px'/>} 
        
        {filteredobjects.map((object) => (
          <Grid item key={object["@id"]}>
            <Card className={classes.root}>
            
              <Typography gutterBottom variant="body1" color="secondary">
                ${object.Price[0].value}
                <Button
                onClick={()=>dispatch(pushItemToCart(object))}
                >
                  <AddShoppingCartIcon />
                </Button>

              </Typography>
              <CardActionArea>

                <Link
                  className={classes.link}
                  to={{ 
                    pathname : `${object['@id']}/${(object.name)}`, 
                    state: { message: 'hello, im a passed message!' }}}>

                  <CardMedia
                    title={object.printTime}
                    image={ process.env.REACT_APP_BASE_PATH + object.images[0].path}
                    component="img"
                    maxHeight="300px"
                  />

                  <CardContent>
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      component="p"
                    >
                      {object.name}
                    </Typography>
                  </CardContent>
                  
                </Link>
              </CardActionArea>

              <CardActions>
                <Typography variant="body1"></Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
