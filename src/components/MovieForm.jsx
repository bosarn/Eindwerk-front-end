import React from "react";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { getMovies } from "../data/movies";
import {  InputBase, Button } from '@material-ui/core';
import SearchIcon from  '@material-ui/icons/Search';



export default () => {
  const { error, setError, setValue, ...field } = useField("", true);
  const dispatch = useDispatch();
  
  const submitHandler = e => {
    e.preventDefault();
    if (field.value === "") {
      setError(true);
    } else {
      setValue("");
      dispatch(getMovies(field.value));
    }
  };


  return (
    <form onSubmit={submitHandler}>
      <InputBase 
      type="text" {...field} 
      className={error ? "error" : ""} 
      inputProps={{ 'aria-label': 'search' }}>
      </InputBase>
      
      <Button 
      type="submit" 
      variant="contained"
      color='primary'
      ><SearchIcon/> Search </Button>
    </form>
  );
};

