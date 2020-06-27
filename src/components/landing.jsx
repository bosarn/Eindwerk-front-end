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
import {saleCalculator} from '../helpers/moneyconvert'
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
      padding: "5px",
      width: "250px",
      
    },
    headerimage: {
      paddingTop: '50px',
      height: '40%',
      width: '100%',
      clipPath: 'polygon(40% 0, 100% 0, 64% 100%, 0 100%)',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    money: {
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'row', 
      '& div' : {
        textAlign: 'center',
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%',
      }
    },
    shoppingcart: {
      position: 'relative',

    },
    button: {
      marginLeft: "50%",
    },
    caption: {
      position: 'absolute',
      opacity: '0',
      Zindex: '99999999999',  
      width: '100%',
      height: '188px',
      left: 0,
      top: 0,
      background: 'rgba( 0, 0, 0, 0.3)',
      '&:hover': {
        opacity: '1',
        left: 0,
        top:0,
        '& p': {
          opacity: '1',
        },
      },
      '& p' : {
        textAlign: 'center',
        color: 'rgba(f,f,f,1)',
        opacity: '0',
      }
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
    },

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
       {//<img src='\MIA-Vamil_website.jpg' alt='headerimage' className={classes.headerimage} ></img> 
       }
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
                <Card  className={classes.root}>
                  
                    <div className={classes.money}>
                      <div>
                    {object ? (
                      saleCalculator(object.currentPriceValue, object.Price.slice(-2)[0].value , object.Price.slice(-1)[0].description)
                     
                    ) : (
                      <Skeleton animation="wave" height={10} width="40%" />
                    )}
                    </div>
                    {object ? (
                      <Button className={classes.shoppingcart} onClick={() => dispatch(pushItemToCart(object))}>
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
                          pathname: `${object["@id"]}/${object.name}`,
                          state: { message: "hello, im a passed message!" },
                        }}
                      >
                        <div className={classes.caption}>
                        <p>{object.images[0].description}</p>
                        </div>
                        <CardMedia
                          title={object.name}
                          image={
                            `https://wdev.be/wdev_arno/eindwerk/system/public${object.images[0].path}`
  
                          }
                          component="img"
                          maxheight="250px"
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

// check currentprice if currentprice is lower than price before that in array 
// show previousprice and currentprice + description
// calculate the % of price drop


/**
 * currencyFormat(object.currentPriceValue)
 * 
 * const previousvalue = object.Price.slice(-2)[0].value
 * const currentprice = object.currentPriceValue
 * 
 * 
 * if previousvalue > currentprice {
 *        const percent = parseInt(currentprice/previousvalue)
 *        const salepercent = 100-percent
 *      return currencyFormat(previousvalue) + currencyFormat(currentprice) + salepercent+'%' + previousvalue.description
 *        }
 * else {
 *    return currencyFormat(currentprice)
 * }
 * 
 * https://wdev.be/wdev_arno/eindwerk/image.php${object.images[0].path}?width=250&height=250&cropratio=1:1&image=
 *  */                      