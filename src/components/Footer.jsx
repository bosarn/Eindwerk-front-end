import React from 'react';


export default () => {

const opentab = () =>{
    const URL = 'https://github.com/bosarn'
    window.open(URL, '_blank');
}

    return (
        <footer className='footer'>        
        <p>Copyright en al...</p>
        <p>Contacteer ons op onze barbecue</p>

        <div onClick={opentab}> Github</div>
        </footer>

    )
}