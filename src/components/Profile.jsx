import React from 'react'

import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core"

export default () => {


    const useStyles = makeStyles({
        flex: {
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around'
        },
        form: {
          marginTop: '5em',
          padding: "0 3em",
          width:'30%',
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
      
        },
      
        loginForm: {
          borderTop: '20px solid pink',
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
            background: 'pink',
            color: '#921002',
            fontWeight: 'bolder',
        },
        Title:{
            color: '#921002',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1em'
        }
      
      });
      




const classes = useStyles();



    return (

        <div className={classes.form}>
        <h1 className={classes.Title}> Register </h1>
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


              <div> ORDERS LISTED ON RGHT </div>
              </div>
              
        )
}