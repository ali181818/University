'use strict';

const formValid = document.getElementById('form-valid');
const formMessage = document.getElementById('form-message');

const buttonFormValid = document.querySelector('#form-valid button');
const buttonFormMessage = document.querySelector('#form-message button');

const inputsFromValid = document.querySelectorAll('#form-valid input');
const inputsFromMessage = document.querySelectorAll('#form-message input[type="text"]');

const Modal = document.querySelector('.modal');
const ModalContent = document.querySelector('.modal .content');
const ModalButton = document.querySelector('.modal button');

function Ajax (type='POST',url='/',data){
  return new Promise((resolve,reject)=>{
    const ajax = new XMLHttpRequest();
    data ? ajax.open( type , `${url}?data=${JSON.stringify(data)}`) : ajax.open(type,url);
    ajax.setRequestHeader('Content-Type',"application/json;charset=UTF-8");
    ajax.addEventListener('load',function(){
      if(this.readyState==XMLHttpRequest.DONE){
        if(this.status == 200){
          if(this.response){
            // console.log(this.responseText)
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

function prevent( e ) {
  e.preventDefault();
}

formValid.addEventListener('submit', e => prevent(e));
formMessage.addEventListener('submit', e => prevent(e));

formValid.addEventListener('submit', e => {
  prevent(e);
  const Data = {
    type : 'valid'
  };
  inputsFromValid.forEach( input => {
    if( input.value && input.checkValidity() )
      Data[input.name] = input.value;
  })
  Ajax('GET','./api.php',Data)
  .then( response => {
    Modal.classList.add('show-modal','anim-modal');
    Modal.classList.remove('hide-modal','anim-modal-rev');   
    ModalContent.innerHTML = response.data;
  });
});

formMessage.addEventListener('submit', e => {
  prevent(e);
  const Data = {
    type : 'message'
  };
  inputsFromMessage.forEach( input => {
    if( input.value && input.checkValidity() )
      Data[input.name] = input.value;
  })
  Data.gender = document.querySelector('#form-message input[name="gender"]:checked').value || 'Male';
  Ajax('GET','https://aliallameh.ir/Project/Univercity/4-Form/api.php',Data)
  .then( response => {
    Modal.classList.add('show-modal','anim-modal');
    Modal.classList.remove('hide-modal','anim-modal-rev');  
    ModalContent.innerHTML = response.data;
  });
});

ModalButton.addEventListener('click', () => {
  Modal.classList.remove('anim-modal');
  Modal.classList.add('anim-modal-rev'); 
  setTimeout(() => {
    Modal.classList.remove('show-modal');
    Modal.classList.add('hide-modal'); 
  }, 900);
})