'use strict';

const info = document.querySelector('.info');
const register = document.querySelector('.register');
const login = document.querySelector('.login');

const img = document.querySelector('header img');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const formRegister = document.getElementById('form-register');
const formLogin = document.getElementById('form-login');

const buttonFormRegister = document.querySelector('#form-register button');
const buttonFormLogin = document.querySelector('#form-login button');

const inputsFromRegister = document.querySelectorAll('#form-register input');
const inputsFromLogin = document.querySelectorAll('#form-login input');

const Modal = document.querySelector('.modal');
const ModalContent = document.querySelector('.modal .content');
const ModalButton = document.querySelector('.modal button');

const imgList = ['Apple','Berry','Peach'];

let i = 0;

function animImg() {
  img.classList.remove('slider-anim');
  img.classList.add('slider-anim-rev');
  setTimeout(() => {
    img.classList.remove('slider-anim-rev');
    img.classList.add('slider-anim');
  }, 200);
}

setInterval(() => {
  i = i == imgList.length - 1 ? 0 : i + 1;
  animImg();
  img.src = `./../images/${imgList[i]}.jpg`;
}, 5000);

next.addEventListener('click',() => {
  i = i == imgList.length - 1 ? 0 : i + 1;
  animImg();
  img.src = `./../images/${imgList[i]}.jpg`;
});

prev.addEventListener('click',() => {
  i = i == 0 ? 2 : i - 1;
  animImg();
  img.src = `./../images/${imgList[i]}.jpg`;
});

function Ajax (type='POST',url='/',data){
  return new Promise((resolve,reject)=>{
    const ajax = new XMLHttpRequest();
    data ? ajax.open( type , `${url}?data=${JSON.stringify(data)}`) : ajax.open(type,url);
    ajax.setRequestHeader('Content-Type',"application/json;charset=UTF-8");
    ajax.addEventListener('load',function(){
      if(this.readyState==XMLHttpRequest.DONE){
        if(this.status == 200){
          if(this.response){
            // console.log(this.response);
            resolve(JSON.parse(this.response));
          }
        } else if(this.status != 200){
          reject('داده پیدا نشد !');
        } else{
          reject('جیزی اشتباه است');     
        }
      }
    });
    ajax.send();    
  });
}

function setInfo( response ) {
  info.classList.remove('hide');
  info.classList.add('show');
  register.classList.add('hide');
  login.classList.add('hide');
  info.innerHTML = '';
  info.innerHTML = `
    <p>Name : ${ response.Name }</p>
    <p>Family : ${ response.Family }</p>
    <p>Email : ${ response.Email }</p>
  `;
  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.onclick = logout;
  info.appendChild(logoutButton);
}

function logout(){
  Ajax('GET','./api/logout.php')
  .then( response => {
    if( response ) {
      info.classList.remove('show');
      info.classList.add('hide');
      register.classList.remove('hide');
      login.classList.remove('hide');
    }
  })
}

function getInfo(){
  Ajax('GET','./api/info.php')
  .then( response => {
    if(typeof response === 'object') {
      setInfo( response );
    } else {
      info.textContent = response;
    }
  })
}

getInfo();

function prevent( e ) {
  e.preventDefault();
}

formRegister.addEventListener('submit', e => prevent(e));
formLogin.addEventListener('submit', e => prevent(e));

formRegister.addEventListener('submit', e => {
  prevent(e);
  const Data = {};
  inputsFromRegister.forEach( input => {
    if( input.value && input.checkValidity() )
      Data[input.name] = input.value;
  })
  Ajax('GET','./api/register.php',Data)
  .then( response => {
    if( typeof response === 'object' ) {
      setInfo( response );
    } else {
      Modal.classList.add('show','anim-modal');
      Modal.classList.remove('hide','anim-modal-rev');
      ModalContent.textContent = response;
    }
  });
});

formLogin.addEventListener('submit', e => {
  prevent(e);
  const Data = {};
  inputsFromLogin.forEach( input => {
    if( input.value && input.checkValidity() )
      Data[input.name] = input.value;
  })
  Ajax('GET','./api/login.php',Data)
  .then( response => {
    if( typeof response === 'object' ) {
      setInfo( response );
    } else {
      Modal.classList.add('show','anim-modal');
      Modal.classList.remove('hide','anim-modal-rev');
      ModalContent.textContent = response;
    }
  });
});

ModalButton.addEventListener('click', () => {
  Modal.classList.remove('anim-modal');
  Modal.classList.add('anim-modal-rev'); 
  setTimeout(() => {
    Modal.classList.remove('show');
    Modal.classList.add('hide'); 
  }, 900);
})
