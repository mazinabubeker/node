var socket;

let osc, playing, freq, amp;
var keys = "QWERTYUIOP";
var num_keys = 10;
var key_ids = [];

function setup(){
    osc = []
    playing = []
    for(var i = 0; i < num_keys; i++){
        osc.push(new p5.Oscillator('sine'));
        osc[i].freq(2100*(i+1)/10);
        osc[i].amp(0);
        playing.push(false);
    }
}

// if(window.event.keyCode==13){e.preventDefault();}else{return;}
$(document).ready(function(){    
    socket = io();
    document.querySelector('body').focus();
    document.querySelector('body').addEventListener("keydown", playKey);
    document.querySelector('body').addEventListener("keyup", stopKey);
    for(var i = 0; i < keys.length; i++){
        key_ids.push(keys[i].charCodeAt(0));
    }

    
    let piano_container = document.getElementById('container');
    for(var i = 0; i < keys.length; i++){
        piano_container.insertAdjacentHTML('beforeend', `<div class='key'></div>`);
    }
    

    // document.querySelector('html').keyPressed(startTone);
    // document.querySelector('html').keyPressed(stopTone);

    socket.on('play_key_resp', forcePlayAtIndex);
    socket.on('stop_key_resp', forceStopAtIndex);
});


function playKey(e){
    if(!key_ids.includes(window.event.keyCode)){return;}
    let index = key_ids.indexOf(window.event.keyCode);
    if(playing[index]){return;}
    osc[index].start();
    osc[index].amp(.3);
    playing[index] = true;
    socket.emit('play_key', index);
    document.getElementsByClassName('key')[index].style.backgroundColor = "#42b6f5";
}

function forcePlayAtIndex(index){
    osc[index].start();
    osc[index].amp(.3);
    playing[index] = true;
    document.getElementsByClassName('key')[index].style.backgroundColor = "#f77272";
}

function stopKey(e){
    if(!key_ids.includes(window.event.keyCode)){return;}
    let index = key_ids.indexOf(window.event.keyCode);
    osc[index].amp(0);
    playing[index] = false;
    socket.emit('stop_key', index);
    document.getElementsByClassName('key')[index].style.backgroundColor = "white";
}

function forceStopAtIndex(index){
    osc[index].amp(0);
    playing[index] = false;
    document.getElementsByClassName('key')[index].style.backgroundColor = "white";
}

