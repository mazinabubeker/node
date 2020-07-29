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



/*
// SAMPLE GET REQUEST:

queryGET('/query_get', res=>{
    console.log("GET successful:");
    console.log(res);
}, err=>{
    console.log("Error:");
    console.log(err);
});

// SAMPLE POST REQUEST:

queryPOST('/query_post', {name: "Mazin Abubeker", age: 22}, res=>{
    console.log("POST successful:");
    console.log(res);
}, err=>{
    console.log("Error:");
    console.log(err);
});

*/

function queryPOST(url, query, successCallback, errorCallback){
    const options = {method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
                };
    fetch(url, options)
    .then(resp => resp.text())
    .then(json=>{
        successCallback(JSON.parse(json));
    })
    .then(err=>{
        if(err){
            errorCallback(err);
        }
    });
}

function queryGET(url, successCallback, errorCallback){
    const options = {method: 'GET',
                    headers: {
                        'Content-Type': 'html/text'
                    },
                };
    fetch(url, options)
    .then(resp => resp.text())
    .then(text=>{
        successCallback(text);
    })
    .then(err=>{
        if(err){
            errorCallback(err);
        }
    });
}