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

let reg_view = false;
let reg_passeye = document.getElementById("reg-pass-view");
let reg_passinput = document.getElementById("reg-password");

reg_passeye.addEventListener("click", () => {
    if(reg_view){
        if(reg_passinput.type === 'password') reg_passinput.setAttribute('type', 'text');
        reg_passeye.src = "/icons/eye.svg";
        reg_view = !reg_view;
    }else{
        if(reg_passinput.type === 'text') reg_passinput.setAttribute('type', "password");
        reg_passeye.src = "/icons/eye-off.svg";
        reg_view = !reg_view;
    }
});

let reg_conf = false;
let reg_confeye = document.getElementById("reg-confpass-view");
let reg_confinput = document.getElementById("reg-confpassword");

reg_confeye.addEventListener("click", () => {
    if(reg_conf){
        if(reg_confinput.type === 'password') reg_confinput.setAttribute('type', 'text');
        reg_confeye.src = "/icons/eye.svg";
        reg_conf = !reg_conf;
    }else{
        if(reg_confinput.type === 'text') reg_confinput.setAttribute('type', "password");
        reg_confeye.src = "/icons/eye-off.svg";
        reg_conf = !reg_conf;
    }
});

let flip = document.querySelector(".flip-inner");
document.getElementById("register").addEventListener('click', () => {
    flip.style.transform = "rotateY(180deg)";
});

document.getElementById("login").addEventListener('click', () => {
    flip.style.transform = "rotateY(360deg)";
});