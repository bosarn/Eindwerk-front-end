import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";


export default () => {


    const submitHandler = (e) => {
        e.preventDefault();
        console.log('this blows');
    };


return (


            <form method="post" onsubmit="submitHandler()">

                <input name="kaketer" type="text"/>
                    <button type="submit"> kak eten</button>
            </form>





)



}

