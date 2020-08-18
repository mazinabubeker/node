var auth_code = '';
var auth_token = '';

$(document).ready(function(){
    if(window.location.href.includes('code')){
        document.getElementById('btn-login').remove();
        const urlParams = new URLSearchParams(window.location.search);
        auth_code = urlParams.get('code');
        let auth_btn = `<div id='btn-authorize' class='btn' onclick='retrieve_token()'>AUTHORIZE</div>`;
        document.body.insertAdjacentHTML('beforeend', auth_btn);
    }
});

function authorize_login(){
    fetch('/authorize_login')
    .then(resp => resp.text())
    .then(data=>{
        window.location.href = data;
    });
}


function retrieve_token(){
  document.getElementById('btn-authorize').remove();
  fetch('/retrieve_token', {method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({code: auth_code})
                  })
  .then(resp => resp.text())
  .then(data=>{
    console.log('ok');
    let search_btn = `<div id='btn-search' class='btn' onclick='request()'>REQUEST</div>`;
    search_btn += `<input type='text' id='search-input' style='width: 200px;'></div>`;
    search_btn += `<img id='load-gif' style='display: none' src='assets/load.gif'/>`;
    search_btn += `<div id='results' style=' min-width: 200px; min-height: 400px; width: fit-content; height: fit-content; padding: 2px; border: 2px solid black;'></div>`;
    document.body.insertAdjacentHTML('beforeend', search_btn);
    document.getElementById('search-input').addEventListener('keyup', e=>{
      if(e.keyCode == 13){
        request();
      }
    });
  });
}

function request(){
  let result_box = document.getElementById('results');
  document.getElementById('load-gif').style.display = 'block';
  // result_box.style.filter = "blur(2px)";
  fetch('/ask', {method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({user_req: document.getElementById('search-input').value})
                    })
    .then(resp => resp.text())
    .then(data=>{
      // result_box.style.filter = '';
      document.getElementById('load-gif').style.display = 'none';
      result_box.innerHTML = '';
      data = JSON.parse(data);
      console.log(data.songs[0].img);
      console.log(data.songs[1].img);
      console.log(data.songs[2].img);
      for(var i = 0; i < data.songs.length; i++){
        document.body.style.filter = "blur(0px)";
        let new_song = document.createElement('div');
        new_song.classList.add('song-item')
        let a = data.songs[i].uri
        let b = data.songs[i].img;
        new_song.addEventListener('click', ()=>{
          playSong(a);
        });
        
        let img_div = document.createElement('img');
        let text_div = document.createElement('p');
        text_div.innerHTML = data.songs[i].title + ` - <span class='artist-text'>` + data.songs[i].artist + `</span>`;
        img_div.classList.add('img-item');
        img_div.src = b;
        new_song.insertAdjacentElement('beforeend', img_div);
        new_song.insertAdjacentElement('beforeend', text_div);
        result_box.insertAdjacentElement('beforeend', new_song);
        // result_box.insertAdjacentHTML('beforeend', `<div class='song-item' style='border-bottom: 2px solid black;' onclick='playSong()'>` +  + `</div>`)
      }
    });
}

function playSong(uri){
  console.log('wowowo');
  console.log(uri);
  fetch('/play', {method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({id: uri})
                    })
    .then(resp => resp.text())
    .then(data=>{

    });
}