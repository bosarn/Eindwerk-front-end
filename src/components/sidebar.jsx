import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector,useDispatch } from "react-redux";
import { toggleFilter } from "../data/filter";
import { Checkbox, Button, Slide, Chip } from "@material-ui/core";




export default ({checker, checked}) => {



  const useStyles = makeStyles(theme=>({
    root: {
      zIndex: 2,
      background: theme.palette.secondary.detail,
      listStyleType: "none",
      color: theme.palette.secondary.main,
      height: "100vh",
      position: 'absolute',
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up(780)] : { 
        width: '20%',
        position: 'initial',
        background: '#fff',
      },

      "& li": {
        marginTop: "20px",
      },
         
    },
  }));

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



const logout=(e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    window.location.replace('http://127.0.0.1:3000/login')
  
}

  const filterHandler = (filter) => {
        dispatch(toggleFilter(filter));
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
              onChange={()=>filterHandler(category)}
              checked={ filter.filters ? filter.filters.includes(category) : false}
              name={category}
            ></Checkbox>
            <Chip
            color="secondary"
            label={category}
            name={category}
            onClick={()=>filterHandler(category)}
             >{category}</Chip>
          </li>
        ))}

        <form onSubmit={logout}>
          <Button type="submit" value="logout" color='secondary' variant='contained'>

            Log out
          </Button>
        </form>
      </ul>
    </Slide>
  );
};

// TODO Clear all filters
