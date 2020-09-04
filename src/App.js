import React,{Component} from 'react';
import Navigation from './components/Navigation/navigation.js';
import FaceRecognition from './components/FaceRecognition/faceRecognition.js';
import Logo from './components/logo/logo.js';
import Clarifai from 'clarifai';
import Imagelink from './components/ImageLink/imagelink.js';
import Rank from './components/Rank/rank.js';
import './App.css';


const app=new Clarifai.App({
  apiKey:'011430e93f60457d897cca6998c4eb31'
});

class App extends Component{
  
    constructor(){
        super()
        this.state={
            input:'',
            imageURL:'',
            box:{}
        }
    }
    
    calculateFaceLocation=(data)=>{
      const obj=data.outputs[0].data.regions[0].region_info.bounding_box;
      const img=document.getElementById('inputImage');
      const width=Number(img.width);
      const height=Number(img.height);
      return{
        leftCol:obj.left_col*width,
        topRow:obj.top_row*height,
        rightCol:width-obj.right_col*width,
        bottomRow:height-obj.bottom_row*height
      }
    }
    
    displayFace=(box)=>{
       this.setState({box:box})
    }

    onInputChange=(event)=>{
      this.setState({input:event.target.value});
    
    }
//a403429f2ddf4b49b307e318f00e528b
    onButtonSubmit=()=>{
      this.setState({imageURL:this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => this.displayFace(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }
   
  render(){
    return (
        <div className="App">
          <Navigation/>
          <Logo/>
          <Rank/>
          <Imagelink 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}  
          />
          <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
        </div>
      );
  }  
  
}

export default App;
