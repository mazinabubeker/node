var socket;
var ball_element;

$(document).ready(function(){    
    socket = io();
    socket.on('mouse', updatePicture);
    ball_element = document.getElementById('ball');
});

function updatePicture(e){
    ball_element.style.top = (Math.floor(window.innerHeight*e.y)-10).toString() + "px";
    ball_element.style.left = (Math.floor(window.innerWidth*e.x)-10).toString() + "px";
}

function mouseUpdate(e){
    var data = {
        x: e.clientX/window.innerWidth,
        y: e.clientY/window.innerHeight
    };
    socket.emit('mouse', data);
}

function activateThing(){
    document.onmousemove = mouseUpdate;
}
