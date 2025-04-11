//Joined Date
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = new Date();
let month = months[date.getMonth()];
localStorage.setItem("Joined_Date", month + " " + date.getFullYear());

//Api Requst
let moviesData = new XMLHttpRequest;
moviesData.open("GET","https://api.themoviedb.org/3/trending/all/week?api_key=eb2ea9d1a56bfee6c00b801429fd0d16");
moviesData.onreadystatechange = () => {
  if(moviesData.readyState == 4 && moviesData.status == 200) {
    let moviesDataRes = moviesData.response;
    let moviesDataResObj = JSON.parse(moviesDataRes);

    //movie ID
    let moveieId = JSON.parse(localStorage.getItem("favorites_id"));

    //check if the favorites array is empty or not
    if(moveieId.length != 0) {
      let favoriteArray =[];
      for (const favMovie of moveieId) {
        for (const element of moviesDataResObj.results) {
          if(favMovie == element.id) {
            favoriteArray.push({
              id:element.id,
              name: (element.name || element.title),
              src:element.poster_path,
            });
          }
        }
      }
      localStorage.setItem("favorites",JSON.stringify(favoriteArray));
    }
  }
}
moviesData.send();

// get full name , Joined Date and photo from localstorage
let photo = document.getElementById("profile-img");
let name = document.getElementById("name");
let joinedDate = document.getElementById("joined-date");
if (
  localStorage.getItem("photo") == null ||
  localStorage.getItem("photo") == ""
) {
  photo.innerHTML = `<i class="fa-solid fa-user user"></i>`;
} else {
  photo.innerHTML = `<img src="imgs/${localStorage.getItem("photo")}">`;
}
let fullName = `${localStorage.getItem("fname")} ${localStorage.getItem(
  "lname"
)}`;
name.innerHTML = fullName;
joinedDate.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${localStorage.getItem(
  "Joined_Date"
)}`;

//Display The Count of Videos in Watching list and favorite list & watchlist and favorites in head
let watchlistCounter = document.getElementById("count-of-watchlist");
let favoritelistCounter = document.getElementById("count-of-favoritelist");
let watchlistCounterHead = document.getElementById("watchlist-head");
let favoriteCounterHead = document.getElementById("favorites-head");

function counterFun(localStorageKey) {
  let listObj = JSON.parse(localStorage.getItem(localStorageKey));
  return listObj.length;
};

if (JSON.parse(localStorage.getItem("watchlist")) != null) {
  watchlistCounter.innerHTML = counterFun("watchlist");
  watchlistCounterHead.innerHTML = counterFun("watchlist");
}
if (JSON.parse(localStorage.getItem("favorites")) != null) {
  favoritelistCounter.innerHTML = counterFun("favorites");
  favoriteCounterHead.innerHTML = counterFun("favorites");
}

//Display Videos from local storage into Watch list and favorites list
let watchlistVideos = document.getElementById("watchlist-videos");
let favoritelistVideos = document.getElementById("favoritelist-videos");

function displayFromLocalStorage(localStorageKey,htmlBox) {
  let listObj = JSON.parse(localStorage.getItem(localStorageKey));
  if (listObj != null && listObj.length != 0) {
    htmlBox.classList.add("grid");
    for (const element of listObj) {
      let video = `<div class="video">
            <a href="#">
                <img src="https://image.tmdb.org/t/p/w500/${element.src}" >
                <span>${element.name}</span>
            </a>
        </div>`;
        htmlBox.innerHTML += video;
    }
  } else {
    htmlBox.classList.remove("grid");
    let emptyMessage = `<div class="empty">
        <p>No Watchlist Yet</p>
        <a href="#">Browse Popular Movies</a>
    </div>`;
    htmlBox.innerHTML = emptyMessage;
  }
}
displayFromLocalStorage("watchlist", watchlistVideos);
displayFromLocalStorage("favorites", favoritelistVideos);

//Clear Watch List and Favorites List
let watchlistTrash = document.getElementById("watchlist-trash");
let favoriteslistTrash = document.getElementById("favoriteslist-trash");


function clearList(localStorageKey) {
  localStorage.setItem(localStorageKey,JSON.stringify([]));
  localStorage.setItem("favorites_id",JSON.stringify([]));
  if(localStorageKey=="favorites"){
    favoritelistCounter.innerHTML = "0";
    favoriteCounterHead.innerHTML = "0";
    displayFromLocalStorage('favorites',favoritelistVideos);

  }else {
    watchlistCounterHead.innerHTML = "0";
    watchlistCounter.innerHTML = "0";
    displayFromLocalStorage("watchlist",watchlistVideos);
  }
}

watchlistTrash.addEventListener("click", () => {
  clearList("watchlist");
});

favoriteslistTrash.addEventListener("click", () => {
  clearList("favorites");
});



