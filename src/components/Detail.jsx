import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getObject } from "../data/object";
import { CardMedia, Paper, Container, Typography } from "@material-ui/core";

export default (props) => {
  const dispatch = useDispatch();

  const detailData = useSelector((state) => state.object);

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
        {detailData.data.name}
      </Typography>
      <Paper className={classes.root}>
        <div className={classes.carousel}>
          {detailData.data.images ? (
            <CardMedia
              className={classes.headimage}
              component="img"
              image={
                process.env.REACT_APP_BASE_PATH + detailData.data.images[0].path
              }
              maxHeight="50px"
            />
          ) : (
            ""
          )}

          <div className={classes.images}>
            {detailData.data.images
              ? detailData.data.images.map((image) => (
                  <CardMedia
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
            {detailData.data.Categories
              ? detailData.data.Categories.map((category) => (
                  <li>{category.name}</li>
                ))
              : "none"}
          </ul>
          <Typography variant="h5">Images</Typography>
          <ul>
            {detailData.data.Categories
              ? detailData.data.images.map((image) => <li>{image.path}</li>)
              : "none"}
          </ul>
          <Typography variant="h5">Price</Typography>
          {detailData.data.Price ? detailData.data.Price[0].value : ""}
          <Typography variant="h5">
            {" "}
            Print-time : {detailData.data.printTime}
          </Typography>
          <Typography variant="h5"> Size: {detailData.data.size} </Typography>
          <Typography>
            {" "}
            BUY NOW! Or satan will eat your ass, like corn on the cob
          </Typography>
        </Container>
      </Paper>
    </Container>
  );
};
