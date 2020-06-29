import React from 'react'
import Typography from "@material-ui/core/Typography";

export const currencyFormat = (int) => {
    //places comma on last 2 digits of int
    // if only 2 digits in the int returns '0, .. '
    let str = int.toString();
    if (str.length > 2) 
    { return '€'+str.slice(0,-2)+ ',' + str.slice(-2)}

    else {return '€0,' + str.slice(-2) }
      
}


export const saleCalculator = (currentprice, previousprice, pricedescription) => {
    if(previousprice > currentprice && pricedescription !== '') {
        const percent = parseInt(currentprice/previousprice*100);
        const salepercent = Math.ceil(100-percent);
    return <>
           <Typography gutterBottom variant="body1" color='primary' align='center' className='saleStyle'><p className='salenumber'>{currencyFormat(previousprice)}</p>
        <p className='salebold'>{currencyFormat(currentprice)}</p> </Typography>

        <p className='salepercent'>-%{salepercent+' '+pricedescription}</p>

</>
        
    }
    else {
            return (<><Typography gutterBottom variant="body1" color='primary' align='center' className='salenormal'>{currencyFormat(currentprice)}</Typography></>)
         }

}

