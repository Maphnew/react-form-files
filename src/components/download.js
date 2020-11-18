import React from 'react';
import axios from 'axios';



const Download = (props) => {
   
    return (
        <div>
        <svg>
            {props.downloadedImage}
        </svg>
        </div>
    )
    
}

export default Download