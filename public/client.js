var socket;
var ball_element;

$(document).ready(function(){    
    socket = io();
    // socket.emit('mouse', data);
    document.getElementById('name').addEventListener('keypress', e=>{
        if(window.event.keyCode==13){e.preventDefault();}else{return;}
        if(document.getElementById('name').value == ''){return;}
        socket.emit('new_user', document.getElementById('name').value);
    });

    socket.on('new_user_resp', name=>{
        addNewUser(name);
    })
});

function addNewUser(name){
    let new_element = `<div class='user'>` + name + `</div>`;
    document.getElementById('box').insertAdjacentHTML('afterbegin', new_element);
    document.getElementById('name').remove();
}