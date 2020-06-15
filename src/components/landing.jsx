import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, CircularProgress, Box, TextField, Snackbar } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getObjects } from "../data/objects";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pushItemToCart } from "../data/shoppingcart";
import { useState } from "react";
import {Pagination, Alert} from "@material-ui/lab";

export default () => {
  const dortor = useSelector((state) => ({
    objects: state.objects,
    filter: state.filters,
  }));

  const { error, loading, data } = dortor.objects;
  const { filter } = dortor;
  const dispatch = useDispatch();

  //getobjects with searchvalue in url objects?name='value'

  useEffect(() => {
    dispatch(getObjects());
  }, [dispatch]);

  const useStyles = makeStyles({
    root: {
      background:
        "linear-gradient(0deg, rgba(255,0,0,.3), rgba(255,0,0,0) 70.71%)",
      padding: "5px",
      width: "250px",
    },
    button: {
      marginLeft: "50%",
    },
    container: {
      marginTop: "4rem",
      boxSizing: 'border-box',
      padding: 0,
      overflowX: 'hidden',
    },
    link: {
      textDecoration: "none",
    },
    textfield: {
      marginLeft: '40%',
      width: "20%",
      marginTop: "2em",
    },
    loading: {
      position: "absolute",
      marginLeft: "40%",
      marginTop: "50vh",
    },
    Pages: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: 'border-box',
      padding: 0,
      overflowX: 'hidden',
    },
    pagination: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "2em",
    },
  });

  const classes = useStyles();

  // Filter data by filterstate , then map all data into the  html
  // array of categories per object
  // filterfunction checks if object has certain categories
  // filterarray.includes( category.name)


  let filterArray = filter.filters;
  let filteredobjects = data;

  // run filtered data to pagination component
  // total objects by category
  // pages by categories data
  // put data in filterstate?
  //  put currentpage in state

  if (filterArray.length !== 0) {
    filteredobjects = data.filter((object) =>
      object.Categories.some((category) => filterArray.includes(category.name))
    );
  }

  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const ObjectsPaged = filteredobjects.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const [textFieldValue, settextFieldValue] = useState('');
  const [open, setOpen] = useState(false);
  // total of objects / postperpage

  const totalObjects = filteredobjects.length;

  const pageNumbers = Math.ceil(totalObjects / postsPerPage);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getObjects(textFieldValue))

  }

  return (
    <>
      <div className={classes.Pages}>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <form onSubmit={submitHandler}>
        <TextField className={classes.textfield} id="outlined-basic" label="Search prints" variant="outlined"  
        onChange={(e) => {settextFieldValue(e.target.value)}}/>

      </form>
      
        {loading && (
          <CircularProgress
            className={classes.loading}
            display={"block"}
            size={100}
            color="secondary"
          />
        )}

        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          {(loading ? Array.from(new Array(10)) : ObjectsPaged).map(
            (object, i) => (
              <Grid item key={object ? object["@id"] : i}>
                <Card className={classes.root}>
                  <Typography gutterBottom variant="body1" color="secondary">
                    {object ? (
                      "$" + object.currentPriceValue
                    ) : (
                      <Skeleton animation="wave" height={10} width="40%" />
                    )}

                    {object ? (
                      <Button onClick={() => dispatch(pushItemToCart(object))}>
                        <AddShoppingCartIcon />
                      </Button>
                    ) : (
                      <AddShoppingCartIcon color="disabled" />
                    )}
                  </Typography>
                  <CardActionArea>
                    {object ? (
                      <Link
                        className={classes.link}
                        to={{
                          pathname: `${object["@id"]}/${object.name}`,
                          state: { message: "hello, im a passed message!" },
                        }}
                      >
                        <CardMedia
                          title={object.printTime}
                          image={
                            process.env.REACT_APP_BASE_PATH +
                            object.images[0].path
                          }
                          component="img"
                          maxheight="300px"
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
                    ) : (
                      <Box pt={0.5}>
                        <Skeleton
                          animation="wave"
                          variant="rect"
                          width={"100%"}
                          height={250}
                          style={{ marginBottom: 6 }}
                        />
                        <Skeleton
                          animation="wave"
                          height={14}
                          width={"80%"}
                          marginTop={"50"}
                        />
                      </Box>
                    )}
                  </CardActionArea>

                  <CardActions>
                    <Typography variant="body1"></Typography>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
        <Pagination
          className={classes.pagination}
          count={pageNumbers}
          color="secondary"
          onChange={handleChange}
          variant="outlined"
        />
        {error !== "" && 
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
        </Snackbar>}
      </div>
    </>
  );
};

/**
 * 
 * Pagination
 * Summon all pages subsequently
 * limit objects on client side throgh filterdata
 * button show next 20
 * 
 * Paginated data
 * from filterdata
 *  data[]
 *  page
 *  
 * 
 *    const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 * 
  const paginate = pageNumber => setCurrentPage(pageNumber);
 */