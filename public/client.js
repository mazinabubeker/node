var socket;

var data = {x: 0, y: 0, z: 0, j: 0, k: 0, l: 0}
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

var cube;

function setData(){
    document.body.innerHTML = `x: ` + data.x + `<br>y: ` + data.y + `<br>z: ` + data.z + `<br>j: ` + data.j + `<br>k: ` + data.k + `<br>l: ` + data.l;
}

$(document).ready(function(){    
    socket = io();
    document.body.style.backgroundColor = "green";
    socket.on('three_time', executeThree);
    socket.on('update_rotation', info=>{
      data.x = info.x;
      data.y = info.y;
      data.z = info.z;
    });
});

function animate() {
	requestAnimationFrame( animate );
  renderer.render( scene, camera );
  cube.rotation.x = data.x;
  cube.rotation.y = data.y;
  cube.rotation.z = data.z;
}

function executeThree(){
  document.body.onclick = "";
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add(cube);

  camera.position.z = 5;
  animate();
}

function startRequest(){
  document.body.style.backgroundColor = "blue";
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.body.style.backgroundColor = "yellow";
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          // User accepted
          window.addEventListener('deviceorientation', () => {
            document.body.style.backgroundColor = "orange";

            data.x = event.alpha;
            data.y = event.beta;
            data.z = event.gamma;
            socket.io('new_rotation', {x: event.alpha, y: event.beta, z: event.gamma});
            setData();
          });
        }
      })
      .catch(e=>{
        // User declined
      });
  } else {
    // Has access
  }

  // if (typeof DeviceMotionEvent.requestPermission === 'function') {
  //   DeviceMotionEvent.requestPermission()
  //     .then(permissionState => {
  //       if (permissionState === 'granted') {
  //         // User accepted
  //         window.addEventListener('devicemotion', () => {
  //             data.j = event.acceleration.x;
  //             data.k = event.acceleration.y;
  //             data.l = event.acceleration.z;
  //             // setData();
  //         });
  //       }
  //     })
  //     .catch(e=>{
  //       // User declined
  //     });
  // } else {
  //   // User already has access

  // }
}






