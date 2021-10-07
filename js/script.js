//variable to store a reference to DOM element
var foodishEl = document.querySelector("#image-div");
var movieEl = document.querySelector(".movie-info");
var btn = document.querySelector(".button");

var genreAction = [];
var genreComedy = [];
var genreDrama = [];
var genreFantasy = [];
var genreSciFi = [];
var genreHorror = [];
var genreMystery = [];
var genreRomance = [];
var genreThriller = [];

// first API call to OMDB
// format api url
var apiUrl = "http://www.omdbapi.com/?t=scream&apikey=8a73c1f2";

//make api request
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        // grabs the genre from the API
        var movieGenre = data["Genre"];
        console.log(movieGenre);

        //grabs the title from the API
        var movieTitle = data["Title"];
        console.log(movieTitle);
    
         // display genre in console
        var getSelectedGenre = function() {
          var getGenres = document.getElementById("genres");
          var selectedGenre = getGenres.options[getGenres.selectedIndex].text;
          console.log(selectedGenre);
        }

          btn.addEventListener("click", function() {
            getSelectedGenre();
        })

     // movie poster will appear for each movie
        var moviePic = data['Poster'];
        console.log(moviePic);

        var moviePoster = new Image();
        moviePoster.src = moviePic;
        moviePoster.alt = data['Plot'];
        movieEl.append(moviePoster);
      });
  // 5 movies for each genre
  // randomly select with Math.random




//second api call 
// format api url
var foodishApiUrl = "https://foodish-api.herokuapp.com/api";
//make api request
fetch(foodishApiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        Object.keys(data).forEach((key) => {
            // create image element
            var imageEl = document.createElement("img");
            //insert image to image element
            imageEl.setAttribute('src', data[key]);
            //append to <div> container
            foodishEl.appendChild(imageEl);
        });
      });
    
