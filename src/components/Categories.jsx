import { useSelector,useDispatch } from "react-redux";
import React,{ useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  
  Paper, 
  Typography,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary,
  Button
 } 
  from '@material-ui/core';
  import {getCategories} from '../data/categories'
  import {toggleFilter} from '../data/filter'

export default () => {

const dispatch = useDispatch();


useEffect(() => {
  dispatch(getCategories())

}, []);

    const useStyles = makeStyles( theme =>({
        root: {
        marginTop: '50px',
        paddingTop: '5px',
        borderTop: '1px solid grey',
        },
        image: {
          height: '100px',
          width: '100px',
          border: `1px solid ${theme.palette.secondary.detail}`
        },

        description: {
          display: 'flex',
          marginLeft: '15%',
          '& p':{
              marginLeft: '5%'
          }
        },
        center: {
          marginLeft: '15%',

        },
        button:{
          color: theme.palette.secondary.main,
          background: theme.palette.secondary.detail
        },
        Title: {
          marginLeft: '30%'
        },
        header: {
          background: theme.palette.secondary.detail,
          color: 'white',
          paddingTop: '10px',
          paddingBottom: '10px'
        }

      }));

      const classes = useStyles();

      const stateData = useSelector((state) => ({
        categories: state.categories
      }));
    
     const  {data} = stateData.categories



const searchbyCategory = (categoryName) => {
  const element = document.querySelector('#ObjectGrid');
  dispatch(toggleFilter(categoryName));

  if(navigator.userAgent.slice(0,7) !== 'Mozilla') {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }
  else{
    element.scrollIntoView({block: 'nearest', inline: 'start' })
  }



}

    return (




<Paper className={classes.root}>
  <Typography variant='h4' align='center' className={classes.header}> Check out each category </Typography>
 {data['hydra:member'] ? data['hydra:member'].map( category =>

<ExpansionPanel className={classes.categoryPanel}>
  
<ExpansionPanelSummary className={classes.center}>
  <img src={`https://wdev.be/wdev_arno/eindwerk/system/public${category.image}`} alt='CategoryNames' className={classes.image}></img>
  <Typography variant='h5' className={classes.Title}> {category.name} </Typography>

  </ExpansionPanelSummary>

  <ExpansionPanelDetails>
  <div className={classes.description}>

<label htmlfor='buttone'> Search all objects using this category
<Button name='buttone' className={classes.button} onClick={()=>searchbyCategory(category.name)}>Search</Button>
</label>
<Typography variant='body2' className={classes.descriptiontext}>{category.description}</Typography>
</div>
    </ExpansionPanelDetails>

</ExpansionPanel>

      )
      : ''}
       


</Paper>


    )
}

