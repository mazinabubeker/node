var socket;

$(document).ready(function(){    
    socket = io();
    setData();
});

var gyroData = {a: 0, x: 0, y: 0, z: 0}

function setup(){
    window.addEventListener('deviceorientation', rotatePhone, true);
}

function rotatePhone(event){
    gyroData.a = event.absolute
    gyroData.x = event.alpha
    gyroData.y = vent.beta
    gyroData.z = vent.gamma
    setData();
}

function setData(){
    document.querySelector('body').innerHTML = "A: " + gyroData.a + "<br>" + "X: " + gyroData.x + "<br>" + "Y: " + gyroData.y + "<br>" + "Z: " + gyroData.z;
}

function draw(){

}

