var socket;
var gyroData = {a: 0, x: 0, y: 0, z: 0, q: 0, r: 0}
$(document).ready(function(){    
    socket = io();
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (event) {
            gyroData.a = event.beta;
            gyroData.x = event.gamma;
            gyroData.y = event.alpha;
            gyroData.z = event.absolute;
            setData();
        }, true);
    }
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            console.log("BEGER")
            gyroData.y = event.acceleration.x;
            gyroData.z = event.acceleration.y;
            setData();
        }, true);
    }
    setData();
});



function setup(){
    // window.addEventListener('deviceorientation', rotatePhone, true);
}

function setData(){
    document.querySelector('body').innerHTML = "A: " + gyroData.a + "<br>" + "X: " + gyroData.x + "<br>" + "Y: " + gyroData.y + "<br>" + "Z: " + gyroData.z + "<br>" + "Q: " + gyroData.q + "<br>" + "R: " + gyroData.r;
}

function draw(){

}

