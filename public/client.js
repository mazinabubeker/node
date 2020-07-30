var socket;

var data = {x: 0, y: 0, z: 0, j: 0, k: 0, l: 0}
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var light;
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );

var cube;

function setData(){
    document.body.innerHTML = `x: ` + data.x + `<br>y: ` + data.y + `<br>z: ` + data.z + `<br>j: ` + data.j + `<br>k: ` + data.k + `<br>l: ` + data.l;
}

$(document).ready(function(){    
    socket = io();
    socket.on('execute_action', val=>{
      if(val==0){
        executeListener();
      }else{
        executeSender();
      }
    });
});

function executeListener(){
  document.body.appendChild( renderer.domElement );
  socket.on('update_rotation', val=>{
      data.x = val.x/40;
      data.y = val.y/40;
      data.z = val.z/40;
      // data.x += .1;
      // data.y += .1;
  });
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add(cube);

  light = new THREE.PointLight(0xFFFFFF,1,500);
  light.position.set(10,0,25);
  scene.add(light);

  camera.position.z = 5;
  animate();
}

function animate() {
	requestAnimationFrame( animate );
  renderer.render( scene, camera );
  cube.rotation.x = data.x;
  cube.rotation.y = data.y;
  cube.rotation.z = data.z;
}

function executeSender(){
  document.body.style.backgroundColor = "orange";
}

function startRequest(){
  document.body.style.backgroundColor = "blue";
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.body.style.backgroundColor = "black";
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          // User accepted

          window.addEventListener('deviceorientation', () => {
            // document.body.style.backgroundColor = "black";
            // if(data.x == Math.round(event.alpha) || data.y == Math.round(event.beta) || data.z == Math.round(event.gamma)){
            //   return;
            // }
            data.x = event.alpha;
            data.y = event.beta;
            data.z = event.gamma;
            setData();
            socket.emit('new_rotation', {x: event.alpha, y: event.beta, z: event.gamma});
          });
        }
      })
      .catch(e=>{
        // User declined
        console.log("Declined");
      });
    } else {
      // Has access
      console.log("Has access");
    }
}
