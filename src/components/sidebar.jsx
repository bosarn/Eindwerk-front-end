import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector,useDispatch } from "react-redux";
import { toggleFilter } from "../data/filter";
import { Checkbox, Button } from "@material-ui/core";

export default (Sidebar) => {
  const useStyles = makeStyles({
    root: {
      background:
        "linear-gradient(0deg, rgba(255,0,0,.3), rgba(255,0,0,0) 70.71%)",

      //'linear-gradient(180deg, rgba(255,255,255,1) 17%, rgba(232,232,232,1) 39%, rgba(210,210,210,1) 54%, rgba(215,215,215,1) 79%, rgba(235,235,235,1) 100%)',
      listStyleType: "none",
      borderRight: "1px solid #d3d3d3",
      color: "black",
      width: "10%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      "& li": {
        marginTop: "20px",
      },
    },
  });

  const dispatch = useDispatch();

  const filterHandler = (e) => {
    dispatch(toggleFilter(e.target.name));
  };

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
    //console.log(filter.filters)
    //console.log(objects.data)
    console.log(data.cart);

  };
  let q = 0;






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
    <>


      <ul className={classes.root}>
        <h2> Categories </h2>
        {allCategories.map((category, i) => (
          <li key={i}>
            <Checkbox
              type="checkbox"
              checked={filter.category}
              onChange={filterHandler}
              name={category}
            ></Checkbox>
            {category}
          </li>
        ))}
        <form onSubmit={log}>
          <Button type="submit" value="check filter state">
            {" "}
            States
          </Button>
        </form>
      </ul>
    </>
  );
};

// TODO Clear all filters
