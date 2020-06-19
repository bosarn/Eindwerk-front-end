import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector,useDispatch } from "react-redux";
import { toggleFilter } from "../data/filter";
import { Checkbox, Button, Slide, Chip } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default ({checker, checked}) => {

  const matches = useMediaQuery('(min-width:600px)');

  const useStyles = makeStyles({
    root: {

      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      //'linear-gradient(180deg, rgba(255,255,255,1) 17%, rgba(232,232,232,1) 39%, rgba(210,210,210,1) 54%, rgba(215,215,215,1) 79%, rgba(235,235,235,1) 100%)',
      listStyleType: "none",
      color: "black",

      height: "100vh",
      position: 'absolute',
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      ['@media (min-width:780px)']: { 
        width: '15%',
        position: 'initial',
        background: "linear-gradient(0deg, rgba(255,0,0,.3), rgba(255,0,0,0) 70.71%)",
      },

      "& li": {
        marginTop: "20px",
      },
         
    },
  });

  const dispatch = useDispatch();



  const classes = useStyles();

  const data = useSelector((state) => ({
    objects: state.objects,
    filter: state.filters,
    cart: state.shoppingcart,
    carousel : state.carousel,
  }));

  const { objects } = data;
  const { filter } = data;
  const{ carousel } = data

  const log = (e) => {
    e.preventDefault();
    console.log(filter.filters)
    //console.log(objects)
    //console.log(data.cart);

  };

  const filterHandler = (e) => {
      if(e.target.innerText != '') {
        dispatch(toggleFilter(e.target.innerText));
      }
      else {
        dispatch(toggleFilter(e.target.name));
      }
    
    
  };


  // fetch all categories from data
  //merge into 1 array
  // filter out duplicates
  var categories = objects.data.map((object) =>
    object.Categories.map((category) => category.name)
  );
  var merged = [].concat.apply([], categories);
  const filtered = (categories) =>
    categories.filter((v, i) => categories.indexOf(v) === i);
  const allCategories = filtered(merged);

  return (
    
    <Slide direction='down' in={checked} mountOnEnter unmountOnExit>

      <ul className={classes.root}>
        <h2> Categories </h2>
        {allCategories.map((category, i) => (
          <li key={i}>
            
            <Checkbox
              label={category}
              type="checkbox"
              onChange={filterHandler}
              checked={ filter.filters ? filter.filters.includes(category) : false}
              name={category}
            ></Checkbox>
            <Chip
            color={"secondary"}
            label={category}
            name={category}
            onClick={filterHandler}
             >{category}</Chip>
          </li>
        ))}
        <form onSubmit={log}>
          <Button type="submit" value="check filter state">

            States
          </Button>
        </form>
      </ul>
    </Slide>
  );
};

// TODO Clear all filters
