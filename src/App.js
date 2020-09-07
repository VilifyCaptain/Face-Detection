import React,{Component} from 'react';
import Navigation from './components/Navigation/navigation.js';
import FaceRecognition from './components/FaceRecognition/faceRecognition.js';
import Logo from './components/logo/logo.js';
import Signin from './components/Sign in/Signin.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Imagelink from './components/ImageLink/imagelink.js';
import Rank from './components/Rank/rank.js';
import './App.css';
import Register from './components/Register/Register.js';


const app=new Clarifai.App({
  apiKey:'011430e93f60457d897cca6998c4eb31'
});

const particleoptions={
  particles: {
     number:{
         value:120,
         density:{
          enable:true,
          value_area:1000
      }
     }
     
  }
}

class App extends Component{
  
    constructor(){
        super()
        this.state={
            input:'',
            imageURL:'',
            box:{},
            route:'Signin',
            isSignedIn:false
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

    onButtonSubmit=()=>{
      this.setState({imageURL:this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => this.displayFace(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }

    onRouteChange=(route)=>{
      
      if(route==='home'){
        this.setState({isSignedIn:true})
      }
      else {
        this.setState({isSignedIn:false})
      }

      this.setState({route: route})

    }
    
   
  render(){
    return (
        <div className="App">
        <Particles className='particles'
                params={particleoptions} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          { this.state.route === 'home'
          ?<div>
          <Logo/>
          <Rank/>
          <Imagelink 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}  
          />
          <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
          </div>
          :
          (
            this.state.route==='Register'
            ?<Register onRouteChange={this.onRouteChange}/>
            :<Signin onRouteChange={this.onRouteChange}/>
          )
          
         
          }
        </div>
      );
  }  
  
}

export default App;
