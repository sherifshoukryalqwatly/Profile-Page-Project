let editImage = document.getElementById("edit-image");
if(localStorage.getItem("photo")==null || localStorage.getItem("photo")=="") {
    editImage.innerHTML = `<i class="fa-solid fa-user user"></i>`;
}else {
    editImage.innerHTML = `<img src="imgs/${localStorage.getItem("photo")}">`;
}
//check the new first name ,last name and phone number is correct or  not
let fnameInput = document.getElementById("fname");
let lnameInput = document.getElementById("lname");
let nameFormat = /^([A-Za-z]{3,})$/;
let phoneInput = document.getElementById("phone");
let phoneFormat = /^([0-9]{11})$/;
//error message
let fnameError = document.getElementById("fname-error");
let lnameError = document.getElementById("lname-error");
let phoneError = document.getElementById("phone-error");
//read the current data from localstorage to update
document.getElementById("fname").value = localStorage.getItem("fname");
document.getElementById("lname").value = localStorage.getItem("lname");
document.getElementById("phone").value = localStorage.getItem("phone");
document.getElementById("pass").value = localStorage.getItem("pass");
//check the first name
fnameInput.onblur = () => {
    if(nameFormat.test(fnameInput.value)){
        fnameError.classList.add("hide");
        fnameInput.style.border = "3px solid black";
    }else {
        fnameError.classList.remove("hide");
        fnameInput.style.border = "3px solid red";
    }
}
//check the last name
lnameInput.onblur = () => {
    if(nameFormat.test(lnameInput.value)){
        lnameError.classList.add("hide");
        lnameInput.style.border = "3px solid black";
    }else {
        lnameError.classList.remove("hide");
        lnameInput.style.border = "3px solid red";
    }
}
//check the phone number
phoneInput.onblur = () => {
    if(phoneFormat.test(phoneInput.value)){
        phoneError.classList.add("hide");
        phoneInput.style.border = "3px solid black";
    }else {
        phoneError.classList.remove("hide");
        phoneInput.style.border = "3px solid red";
    }
}

//stop or submit the form 
let form = document.getElementById("form");

form.onsubmit = () => {
    if(fnameError.classList[1] == "hide" && lnameError.classList[1] == "hide" && phoneError.classList[1] == "hide"){
        event.submit();
    }else {
        event.preventDefault();
    }
}

// set the new values of inputs into localstorage and read from it
window.addEventListener("DOMContentLoaded",() => {
    let url = new URLSearchParams(location.search);
    if(url.get("fname")!=null) {
        localStorage.setItem("fname",url.get("fname"));
        localStorage.setItem("lname",url.get("lname"));
        localStorage.setItem("phone",url.get("phone"));
        localStorage.setItem("pass",url.get("password"));
        url.get("photo")==""? "":localStorage.setItem("photo",url.get("photo"));
    }
    document.getElementById("fname").value = localStorage.getItem("fname");
    document.getElementById("lname").value = localStorage.getItem("lname");
    document.getElementById("phone").value = localStorage.getItem("phone");
    document.getElementById("pass").value = localStorage.getItem("pass");
    if(localStorage.getItem("photo")==null || localStorage.getItem("photo")=="") {
        editImage.innerHTML = `<i class="fa-solid fa-user user"></i>`;
    }else {
        editImage.innerHTML = `<img src="imgs/${localStorage.getItem("photo")}">`;
    };
});