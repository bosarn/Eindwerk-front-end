


export const currencyFormat = (int) => {
    //places comma on last 2 digits of int
    // if only 2 digits in the int returns '0, .. '
    let str = int.toString();
    if (str.length > 2) 
    { return '€'+str.slice(0,-2)+ ',' + str.slice(-2)}

    else {return '€0,' + str.slice(-2) }
      
}