export function Ajax (type='POST',url='/',data){
  return new Promise((resolve,reject)=>{
    const ajax = new XMLHttpRequest();
    ajax.open(type,url);
    ajax.setRequestHeader('Content-Type',"application/json;charset=UTF-8");
    ajax.addEventListener('load',function(){
      if(this.readyState==XMLHttpRequest.DONE){
        if(this.status == 200){
          if(this.response){
            resolve(JSON.parse(this.response));
          }
        } else if(this.status != 200){
          reject('داده پیدا نشد !');
        } else{
          reject('جیزی اشتباه است');     
        }
      }
    });
    data ? ajax.send(JSON.stringify(data)) : ajax.send();    
  });
}