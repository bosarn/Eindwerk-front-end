import React from 'react';


export default () => {

const opentab = () =>{
    const URL = 'https://github.com/bosarn'
    window.open(URL, '_blank');
}

    return (
        <footer className='footer'>        
<ul>        
    <li>3D-Print-Domain </li>
        <li>ValseStraat 32 </li>
        <li>3DprintAdmin</li>
        <li>0434343421</li>
        <li>3Dprintdomaininfo@gmail.com</li></ul>

        <div className='footerlink' onClick={opentab}> Github</div>
        </footer>

    )
}