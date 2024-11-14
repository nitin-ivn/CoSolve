let view = false;
let eyeimg = document.querySelector(".password-view");
let passinput = document.getElementById("password");
eyeimg.addEventListener('click', ()=> {
    if(!view){
        if (passinput.type == 'password') passinput.setAttribute('type','text');
        eyeimg.src = "/icons/eye.svg";
        view = !view;
    }else{
        if (passinput.type == 'text') passinput.setAttribute('type','password');
        eyeimg.src = "/icons/eye-off.svg";
        view = !view;
    }
});