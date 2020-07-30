var socket;

function setData(x,y,z){
    document.querySelector('body').innerHTML = "X: " + x + "<br>" + "Y: " + y + "<br>" + "Z: " + z;
    
}

$(document).ready(function(){    
    // socket = io();
    // if (window.DeviceOrientationEvent) {
    //     setData(0,0,0);
    //     window.addEventListener("deviceorientation", function (event) {
    //         setData(event.alpha, event.beta, event.gamma);
    //     });
    // }

    

    // if (window.DeviceOrientationEvent) {
    //     window.addEventListener('deviceorientation', (e)=>{
    //       setData(event.alpha, event.beta, event.gamma);
    //     });
    //     console.log("fff");
    //   }

    //   if (window.DeviceMotionEvent) {
    //     window.addEventListener('devicemotion', (e)=>{
    //       // document.querySelector('body').innerHTML = "INDEED OH MY DO IT DO IT";
    //     });
    //     console.log("fff");
    //     document.querySelector('body').style.backgroundColor = "green";
    //   }
});

function startRequest(){
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', () => {
            setData(event.alpha, event.beta, event.gamma);
          });
        }
      })
      .catch(e=>{
        document.querySelector('body').innerHTML = "Not granted";
      });
  } else {
    window.addEventListener('deviceorientation', () => {
      setData(event.alpha, event.beta, event.gamma);
    });
  }
}

// import React from 'react';
// import ReactDOM from 'react-dom';

// var nah = 5;

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );

// class App extends React.Component{
//     render(){
//         return (
//             <div id="status">{nah}</div>
//         );
//     }
// }








