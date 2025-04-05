//Profile Data 
localStorage.setItem("fname","Sherif");
localStorage.setItem("lname","Shoukry");
localStorage.setItem("email","");
localStorage.setItem("pass","5566");
localStorage.setItem("phone","01110317344");
localStorage.setItem("country","");
localStorage.setItem("photo","photo.jpg");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date = new Date();
let month = months[date.getMonth()];

localStorage.setItem("Joined_Date",month+" "+date.getFullYear());

// get full name , Joined Date and photo from localstorage
let photo = document.getElementById("profile-img");
let name = document.getElementById("name");
let joinedDate = document.getElementById("joined-date");
if(localStorage.getItem("photo")==null || localStorage.getItem("photo")=="") {
    photo.innerHTML = `<i class="fa-solid fa-user user"></i>`;

}else {
    photo.innerHTML = `<img src="imgs/${localStorage.getItem("photo")}">`;
}
let fullName = `${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`
name.innerHTML = fullName;
joinedDate.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${localStorage.getItem("Joined_Date")}`;


// data of watching list 
let watchlistdataObject = [
    {
    id:1,
    src:'imgs/Bogeyman.jpg',
    name:'Bogeyman'
    },
    {
    id:2,
    src:'imgs/Venom.jpg',
    name:'Venom'
    },
    {
    id:3,
    src:'imgs/Robyhouse.jpg',
    name:'Robyhouse'
    },
    {
    id:4,
    src:'imgs/Alexandria.jpg',
    name:'Alexandria'
    },
];
let favoritesdataObject = [
    {
    id:1,
    src:'imgs/Venom.jpg',
    name:'Venom'
    },
    {
    id:2,
    src:'imgs/Robyhouse.jpg',
    name:'Robyhouse'
    },
    {
    id:3,
    src:'imgs/Alexandria.jpg',
    name:'Alexandria'
    },
];
localStorage.setItem("watchlist",JSON.stringify(watchlistdataObject));
localStorage.setItem("favorites",JSON.stringify(favoritesdataObject));

//Display The Count of Videos in Watching list and favorite list & watchlist and favorites in head
let watchlistCounter =document.getElementById("count-of-watchlist");
let favoritelistCounter =document.getElementById("count-of-favoritelist");
let watchlistCounterHead =document.getElementById("watchlist-head");
let favoriteCounterHead =document.getElementById("favorites-head");
function counterFun(str,obj,obj2) {
    let listObj = JSON.parse(localStorage.getItem(str));
    obj.innerHTML = listObj.length;
    obj2.innerHTML = listObj.length;
};
if(JSON.parse(localStorage.getItem("watchlist"))!= null){
    counterFun("watchlist",watchlistCounter,watchlistCounterHead);
}
if(JSON.parse(localStorage.getItem("favorites"))!= null){
    counterFun("favorites",favoritelistCounter,favoriteCounterHead);
}

//Display Videos from local storage into Watch list and favorites list
let watchlistVideos = document.getElementById("watchlist-videos");
let favoritelistVideos = document.getElementById("favoritelist-videos");
function displayFromLocalStorage(str,box){
    let listObj = JSON.parse(localStorage.getItem(str));
    if(listObj!= null && listObj.length!=0){
        box.classList.add("grid");
        for (const element of listObj) {
            let video = `<div class="video">
            <a href="#">
                <img src="${element.src}" >
                <span>${element.name}</span>
            </a>
        </div>`;
        box.innerHTML += video;
        };
    }else {
        box.classList.remove("grid");
        let emptyMessage = `<div class="empty">
        <p>No Watchlist Yet</p>
        <a href="#">Browse Popular Movies</a>
    </div>`;
    box.innerHTML = emptyMessage;
    }
}
displayFromLocalStorage("watchlist",watchlistVideos);
displayFromLocalStorage("favorites",favoritelistVideos);


//Clear Watch List and Favorites List
let watchlistTrash = document.getElementById("watchlist-trash");
let favoriteslistTrash = document.getElementById("favoriteslist-trash");
function clearList(str,obj,obj2,box,trash) {
    let listObj = JSON.parse(localStorage.getItem(str));
    trash.addEventListener("click",() => {
        if(listObj.length!=0){
            localStorage.setItem(str,JSON.stringify([]));
            displayFromLocalStorage(str,box);
            counterFun(str,obj,obj2);
        };
        });
}
clearList("watchlist",watchlistCounter,watchlistCounterHead,watchlistVideos,watchlistTrash);
clearList("favorites",favoritelistCounter,favoriteCounterHead,favoritelistVideos,favoriteslistTrash);


