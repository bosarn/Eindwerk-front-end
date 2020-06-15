import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCarousel, advanceCarousel, maxCarousel } from "../data/carousel";
import { getObject } from "../data/object";
import {
  CardMedia,
  Paper,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

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
  });
  const classes = useStyles();

  return (
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
            ""
          )}

          <div className={classes.images}>
            {object.data.images
              ? object.data.images.map((image, i) => (
                  <CardMedia
                    onClick={() => dispatch(setCarousel(i))}
                    className={classes.slider}
                    title={image.name}
                    image={process.env.REACT_APP_BASE_PATH + image.path}
                    component="img"
                  />
                ))
              : "none"}
          </div>
        </div>
        <Container className={classes.panel}>
          Carousel van afbeeldingen maken
          <Typography variant="h5">Tags</Typography>
          <ul>
            {object.data.Categories
              ? object.data.Categories.map((category) => (
                  <li>{category.name}</li>
                ))
              : "none"}
          </ul>
          <Typography variant="h5">Images</Typography>
          <ul>
            {object.data.images
              ? object.data.images.map((image) => <li>{image.path}</li>)
              : "none"}
          </ul>
          <Typography variant="h5">Price : ${object.data.currentPriceValue } </Typography>
          
          <Typography variant="h5">
            {" "}
            Print-time : {object.data.printTime}
          </Typography>
          <Typography variant="h5"> Size: {object.data.size} </Typography>
          <Typography>
            {"Description here"}
           
          </Typography>
        </Container>
      </Paper>
    </Container>
  );
};
