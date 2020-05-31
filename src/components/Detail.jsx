import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getObjects } from "../data/objects";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getObject} from "../data/object"
import CardMedia from "@material-ui/core/CardMedia";


export default (props) => {
const dispatch = useDispatch();
  
const detailData = useSelector(state => (state.object))
    


    useEffect(() => {
      dispatch(getObject(props.match.params.id));
    }, [] 
    );


// detailData.data.images.map(image => <img src={"http://192.168.0.128:8000" + image.path} > </img>)


    return(

        <div>
            <h1>{detailData.data.name}</h1>
            Carousel van afbeeldingen maken
            { detailData.data.images ?  detailData.data.images.map(image =>
            <CardMedia
                    title={image.name}
                    image={"http://192.168.0.128:8000" + image.path}
                    component="img"
                    maxHeight="300px"
                  /> )  
                  : 
                  'none'}

            <h2>Tags</h2>
            <ul>
                { detailData.data.Categories ? detailData.data.Categories.map(category => <li>{category.name}</li>): 'none'}
            </ul>
            <h2>Images</h2>
            <ul>
                { detailData.data.Categories ? detailData.data.images.map(image => <li>{image.path}</li>): 'none'}
            </ul>
            <h2>Price</h2>
            {detailData.data.Price ? detailData.data.Price[0].value : ' ching chong'}

            <h2> Print-time : {detailData.data.printTime}</h2>

            <h2> Size: {detailData.data.size} </h2>
            <p> BUY NOW! Or satan will eat your ass, like corn on the cob</p>
            

                
      
            
        



        
        
        
        
        
        
        
        
        
        
        </div>
        


    )
}