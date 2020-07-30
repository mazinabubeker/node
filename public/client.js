var socket;
var gyroData = {x: 0, y: 0, z: 0, a: 0, j: 0, k: 0}
$(document).ready(function(){    
    socket = io();

    // if (window.DeviceOrientationEvent) {
    //     setData();
    //     window.addEventListener("deviceorientation", function (event) {
    //         gyroData.x = event.alpha;
    //         gyroData.y = event.beta;
    //         gyroData.z = event.gamma;
    //         gyroData.a = event.absolute;
    //     }, true);
    // }
    // if (window.DeviceMotionEvent) {
    //     setData();
    //     window.addEventListener('devicemotion', function (event) {
    //         gyroData.j = event.acceleration.x;
    //         gyroData.k = event.acceleration.y;
    //     }, true);
    // }
    let gyroscope = new Gyroscope({frequency: 60});

    gyroscope.addEventListener('reading', e => {
        setData(gyroscope.x, gyroscope.y, gyroscope.z)
    });
    gyroscope.start();
});



// function setData(){
//     document.querySelector('body').innerHTML = "X: " + gyroData.x + "<br>" + "Y: " + gyroData.y + "<br>" + "Z: " + gyroData.z + "<br>" + "A: " + gyroData.a + "<br>" + "J: " + gyroData.j + "<br>" + "K: " + gyroData.k;
// }

function setData(x,y,z){
    document.querySelector('body').innerHTML = "X: " + x + " " + y + " " + z;
}


