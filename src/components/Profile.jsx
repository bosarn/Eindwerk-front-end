import React from 'react'

import {makeStyles} from "@material-ui/core/styles";
import {Button, Paper} from "@material-ui/core"
import Orders from './Orders'


export default () => {


    const useStyles = makeStyles(theme => ({
        flex: {
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around'
        },
        form: {
          marginTop: '3em',
          width:'100%',
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
      
        },
      
        loginForm: {
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '80%',
          borderTop: `20px solid ${theme.palette.secondary.detail}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: '1px solid grey',
        },
        inputField: {
          color: 'grey',
          width: '50%',
          textAlign: 'center',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginBottom: '1em'
      
        },
        button:{
            background: theme.palette.secondary.detail,
            color: theme.palette.secondary.main,
            fontWeight: 'bolder',
        },
        Title:{
            color: theme.palette.secondary.main,
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1em'
        }
      
      }));
      




const classes = useStyles();



    return (
<>
        <Paper className={classes.form}>
        <h1 className={classes.Title}> Change user details </h1>
              <form  className={classes.loginForm}>
              <h2 className={classes.Title}>E-mail:</h2>
                  <input  
                  
                
                  type="text" 
                  className ={classes.inputField}></input>
    
        
                  <h2 className={classes.Title}>Password:</h2>
                  <input   

                  name="password" 
                  type="password"
                  className ={classes.inputField }

                  /> 
                <h2 className={classes.Title}>Name:</h2>
                  <input  
                  

                  type="text" 
                  className ={classes.inputField}
              />   
        
                <h2 className={classes.Title}>Adress:</h2>
                  <input  
                  
                  onChange=''
                  type="text" 
                  className ={classes.inputField}
                  value= ''/>      
                         <h2 className={classes.Title}>Number:</h2>
                  <input  
                  
                  onChange=''
                  type="text" 
                  className ={classes.inputField}
                  value= ''/>   
                <h2 className={classes.Title}>Other:</h2>
                  <input  
                  
                  onChange=''
                  type="text" 
                  className ={classes.inputField}
                  value= ''/>         
                  <Button 
                  className={classes.button}
                  type="submit">
                    Register
                    </Button>    
              </form>
              </Paper>
              <Orders/>
              </>
              
        )
}