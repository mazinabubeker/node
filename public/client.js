// var socket;

function setData(x,y,z){
    document.querySelector('body').innerHTML = "X: " + x + "<br>" + "Y: " + y + "<br>" + "Z: " + z;
}

$(document).ready(function(){    
    // socket = io();

    
});



if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
        setData(event.alpha, event.beta, event.gamma);
    });
}
