let fav = [];
let weather = {
    "apiKey": "6433f9664c642a6cf5a67493ce303e5d",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + this.apiKey
        )
        .then((response) => response.json())
        .then((data)=> this.displayWeather(data))
        .catch ((e) => {
          alert("Vstup neni validni")
        })
        
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp, feels_like, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,feels_like,humidity,speed)
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".feels_like").innerText ="Feels like: " + feels_like + "°C";
        document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
        document.getElementById("btnAdd").style.display = "block";
        document.getElementById("btnDel").style.display = "block";     
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

};

var buttonAdd = document.getElementById("btnAdd");
var buttonDel = document.getElementById("btnDel");

document.querySelector(".search button").addEventListener("click", function()
{
  if(document.querySelector(".search-bar").value == ""){
    alert("Nevyplnil si pole");
  }
  else{
      weather.search();
  }
});

document.querySelector(".search-bar").addEventListener("keyup",function()
{
    if(event.key =="Enter"){
        weather.search();
    }
});


buttonAdd.onclick = function (){
    var favplace = document.querySelector(".search-bar").value;
    if(favplace == ""){
        return;
    }
    if(fav.length == 10){
        alert("Nelze mít víc jak 10 oblíbených míst!");
      }
      else{
        if (fav.indexOf(favplace) === -1) {
          fav.push(favplace);
          localStorage.setItem("favorite", JSON.stringify(fav));
          document.querySelector(".city").style.color = "#ffb925";
          showFavPlaces();
          console.log(localStorage);
        }
      }
}

buttonDel.onclick = function (){
    var favplace = document.querySelector(".search-bar").value;
    if(favplace == ""){
       return;
    }
    else{
      index = fav.indexOf(favplace);
        if (index > -1) {
          fav.splice(index, 1);
          localStorage.setItem("favorite", JSON.stringify(fav))
          document.querySelector(".city").style.color = "#fff";
          showFavPlaces();
          console.log(localStorage);
    }
  }
  
  }

function showFavPlaces(){
      string = "";
      for (var i = 0; i < fav.length; i++) {
        string += `<input type="button" id="favplaces" onclick="weather.fetchWeather(this.value)" value="${fav[i]}" ></input><br>`;
      }
      document.getElementById('favorite-bar').innerHTML = string;
  }


  window.onload = function(){
    if(localStorage.getItem('favorite')){
      fav = JSON.parse(localStorage.getItem('favorite'));
      showFavPlaces();
    }
    console.log(localStorage);
  }