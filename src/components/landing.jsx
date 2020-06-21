import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, CircularProgress, Box, TextField, Chip } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React, { useEffect } from "react";
import { getObjects } from "../data/objects";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pushItemToCart } from "../data/shoppingcart";
import { useState } from "react";
import {Pagination, Alert} from "@material-ui/lab";
import DoneIcon from '@material-ui/icons/Done';
import {currencyFormat} from '../helpers/moneyconvert'
import { toggleFilter } from "../data/filter";
import Snackbar from './Snackbar';
import {ToastDashMessage} from '../data/snackbar'
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';

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

  const useStyles = makeStyles((theme) => ({
    root: {
      background: `linear-gradient(180deg, ${theme.palette.secondary.main} 1% , #eee 2% , #fff 4% , ${theme.palette.secondary.detail} 100%)`,
      //background: '#e3e1da',
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
      color: theme.palette.primary.detail,
    },
    textalign:{
      display: 'flex',
      justifyContent: 'center',
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
    chips: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      '& li' : {
          marginLeft: '10px'
      },


    }
  }));

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

  const postsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const ObjectsPaged = filteredobjects.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const [textFieldValue, settextFieldValue] = useState('');

  // total of objects / postperpage

  const totalObjects = filteredobjects.length;

  const pageNumbers = Math.ceil(totalObjects / postsPerPage);



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getObjects(textFieldValue))

  }
  const handleDelete = (filter) => {

    dispatch(toggleFilter(filter))
  };

  const handleClickChip = () => {
    console.info('You clicked the Chip.');
  };

  return (
<>
      <div className={classes.Pages}>
      <form className={classes.textalign} onSubmit={submitHandler}>
        
        <TextField className={classes.textfield} id="outlined-secondary" label="Search prints..." variant="outlined"  color='secondary'
        onChange={(e) => {settextFieldValue(e.target.value)}}/>

      </form>
      
        {loading && (
          <CircularProgress
            className={classes.loading}
            display={"block"}
            size={100}            
          />
        )}

        <ul className={classes.chips}>
    {filterArray.map((filter,i) => 
    <li key={i}>
    <Chip
      label={filter}
      className={classes.chip}
      clickable={true}
      onClick={handleClickChip}
      onDelete={()=>handleDelete(filter)}
      color='secondary'
    />
  </li>
    )}
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
<Box  boxShadow={3}>
                <Card  className={classes.root}                >
                  
                  <Typography gutterBottom variant="body1" color='primary' align='center'>
                    {object ? (
                      currencyFormat(object.currentPriceValue)
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
                          title={object.name}
                          image={
                            process.env.REACT_APP_BASE_PATH +
                            object.images[0].path
                          }
                          component="img"
                          maxheight="300px"
                        />

                        <CardContent>
                          <Typography
                            align='center'
                            variant="h5"
    
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

