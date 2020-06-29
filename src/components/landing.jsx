import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Box,
  TextField,
  Chip,
} from "@material-ui/core/";
import Skeleton from "@material-ui/lab/Skeleton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React, { useEffect, useState } from "react";
import { getObjects } from "../data/objects";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pushItemToCart } from "../data/shoppingcart";
import { Pagination } from "@material-ui/lab";
import { saleCalculator } from "../helpers/moneyconvert";
import { toggleFilter } from "../data/filter";
import { ToastDashMessage } from "../data/snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { regexvalidate } from "../helpers/validation";
import slugify from "../helpers/slugify";

export default () => {
  const dortor = useSelector((state) => ({
    objects: state.objects,
    filter: state.filters,
  }));

  const { loading, data } = dortor.objects;
  const { filter } = dortor;
  const dispatch = useDispatch();

  // fetch objectdata
  useEffect(() => {
    dispatch(getObjects());
  }, [dispatch]);

  //styling
  const useStyles = makeStyles((theme) => ({
    root: {
      background: `linear-gradient(180deg, ${theme.palette.secondary.main} 1% , #eee 2% , #fff 4% , ${theme.palette.secondary.detail} 100%)`,
      padding: "5px",
      width: "250px",
    },
    headerimage: {
      paddingTop: "50px",
      height: "40%",
      width: "100%",
      clipPath: "polygon(40% 0, 100% 0, 64% 100%, 0 100%)",
      marginLeft: "auto",
      marginRight: "auto",
    },
    money: {
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "row",
      "& div": {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
    },
    shoppingcart: {
      position: "relative",
    },
    button: {
      marginLeft: "50%",
    },
    caption: {
      position: "absolute",
      opacity: "0",
      Zindex: "99999999999",
      width: "100%",
      height: "188px",
      left: 0,
      top: 0,
      background: "rgba( 0, 0, 0, 0.3)",
      "&:hover": {
        opacity: "1",
        left: 0,
        top: 0,
        "& p": {
          opacity: "1",
        },
      },
      "& p": {
        textAlign: "center",
        color: "rgba(f,f,f,1)",
        opacity: "0",
      },
    },
    container: {
      marginTop: "4rem",
      boxSizing: "border-box",
      padding: 0,
      overflowX: "hidden",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.primary.detail,
    },
    textalign: {
      display: "flex",
      justifyContent: "center",
    },
    textfield: {
      color: theme.palette.secondary.detail,
      width: "40%",
      marginTop: "2em",
    },
    loading: {
      position: "absolute",
      marginLeft: "50%",
      marginTop: "50vh",
      color: theme.palette.secondary.detail,
    },
    Pages: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      padding: 0,
      overflowX: "hidden",
    },
    pagination: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "2em",
    },
    chips: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      "& li": {
        marginLeft: "1px",
        marginTop: "4px",
      },
    },
  }));

  const classes = useStyles();

  // Filter all objects by categories gotten from the state.
  let filterArray = filter.filters;
  let filteredobjects = data;

  // Gets all the objects filtered by the filterArray
  if (filterArray.length !== 0) {
    filteredobjects = data.filter((object) =>
      object.Categories.some((category) => filterArray.includes(category.name))
    );
  }

  //            pagination
  // adjust postPerPage to adjust the amount of objects displayed on the homepage

  const postsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const ObjectsPaged = filteredobjects.slice(indexOfFirstPost, indexOfLastPost);

  // Get the amount of pagination numbers to display
  const totalObjects = filteredobjects.length;
  const pageNumbers = Math.ceil(totalObjects / postsPerPage);

  //sets the page to show
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // search field for adjusting the getObjects()
  const [textFieldValue, settextFieldValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (regexvalidate(textFieldValue)) {
      dispatch(getObjects(textFieldValue));
    } else {
      dispatch(ToastDashMessage("Please input a valid searchstring", "error"));
    }
  };

  // delete or show chips
  const handleDelete = (filter) => {
    dispatch(toggleFilter(filter));
  };
  const BuyOneItem = (payload) => {
    dispatch(pushItemToCart(payload));
    dispatch(ToastDashMessage(`${payload.name}added to shopping cart`, "info"));
  };

  return (
    <>
      <div className={classes.Pages}>
        <form className={classes.textalign} onSubmit={submitHandler}>
          <TextField
            className={classes.textfield}
            id="outlined-secondary"
            label="Search prints..."
            variant="outlined"
            color="secondary"
            onChange={(e) => {
              settextFieldValue(e.target.value);
            }}
          />
        </form>

        {loading && (
          <CircularProgress
            className={classes.loading}
            display={"block"}
            size={100}
          />
        )}

        <ul className={classes.chips} id="ObjectGrid">
          {filterArray.map((filter, i) => (
            <li key={i}>
              <Chip
                label={filter}
                className={classes.chip}
                clickable={true}
                onDelete={() => handleDelete(filter)}
                color="secondary"
              />
            </li>
          ))}
        </ul>
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          {(loading ? Array.from(new Array(20)) : ObjectsPaged).map(
            (object, i) => (
              <Grid item key={object ? object["@id"] : i}>
                <Box boxShadow={3}>
                  <Card className={classes.root}>
                    <div className={classes.money}>
                      <div>
                        {object ? (
                          saleCalculator(
                            object.currentPriceValue,
                            object.Price.slice(-2)[0].value,
                            object.Price.slice(-1)[0].description
                          )
                        ) : (
                          <Skeleton animation="wave" height={10} width="40%" />
                        )}
                      </div>
                      {object ? (
                        <Button
                          className={classes.shoppingcart}
                          onClick={() => BuyOneItem(object)}
                        >
                          <AddShoppingCartIcon />
                        </Button>
                      ) : (
                        <AddShoppingCartIcon color="disabled" />
                      )}
                    </div>
                    <CardActionArea>
                      {object ? (
                        <Link
                          className={classes.link}
                          to={{
                            pathname: `${object["@id"]}/${slugify(
                              object.name
                            )}`,
                          }}
                        >
                          <div className={classes.caption}>
                            <p>{object.images[0].description}</p>
                          </div>
                          <CardMedia
                            title={object.name}
                            image={`${process.env.REACT_APP_BASE_PATH}${object.images[0].path}`}
                            component="img"
                            maxheight="250px"
                          />

                          <CardContent>
                            <Typography align="center" variant="h5">
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
                            margintop={"50"}
                          />
                        </Box>
                      )}
                    </CardActionArea>
                  </Card>
                </Box>
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
      </div>
    </>
  );
};
