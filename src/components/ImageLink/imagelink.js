import React from 'react';

const Imagelink= ({onInputChange,onButtonSubmit})=>{
    return(
<div>
    <p className='f3'>{'This app will detect faces in your image. Give it a try.'}</p>
    <div className='center pa4 br3 shadow-5 bgpattern' style={{width:'700px'}}>
        <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}></input>
        <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect Faces</button>
    </div>
</div>
    );
}

export default Imagelink;