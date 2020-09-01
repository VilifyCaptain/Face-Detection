import React from 'react';
import Particles from 'react-particles-js';

const particleoptions={
    particles: {
       number:{
           value:100,
           density:{
            enable:true,
            value_area:1000
        }
       }
       
    }
}

const Rank= ()=>{
    return(
       <div>
             <Particles className='particles'
                params={particleoptions} />
           <div className='white f3'>
               {'Aditya, your current rank is ......'}
           </div>
           <div className='white f1'>
               {'#5'}
           </div>
       </div>
    );
}

export default Rank;