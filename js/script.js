//variable to store a reference to DOM element
var foodishEl = document.querySelector("#image-div");
var movieEl = document.querySelector(".movie-info");
var btn = document.querySelector(".button");


// 5 movies for each genre
// randomly select with Math.random
var genreAction = ['Gladiator', 'Black Panther', 'Kill Bill', 'John Wick', 'Die Hard'];
var genreComedy = ['Shaun of the Dead', 'Kiss Kiss, Bang Bang', 'The 40-Year-Old Virgin', 'Borat', 'Superbad'];
var genreDrama = ['Citizen Kane', 'Parasite', 'Casablanca', 'Knives Out', 'Lady Bird'];
var genreFantasy = ['The Hobbit', 'Ladyhawke', 'Solomon Kane', 'Clash of the Titants', 'The Forbidden Kingdom'];
var genreSciFi = ['The Wizard of Oz', 'Avengers: Endgame', 'Toy Story 4', 'Spider-Man', 'Wonder Woman'];
var genreHorror = ["Rosemary's Baby", "The Exorcist", "The Conjuring", "Scream", "Sinister"];
var genreMystery = ["The Girl on the Train", "Clue", "The Fugitive", "Donnie Darko", "Mystic River"];
var genreRomance = ["Love Actually", "The Notebook", "Dirty Dancing", "Pretty Woman", "Love and Basketball"];
var genreThriller = ["Silence of the Lambs", "Basic Instinct", "Memento", "Parasite", "Mulholland Drive"];

// display genre in console
var getSelectedGenre = function () {
  var getGenres = document.getElementById("genres");
  var selectedGenre = getGenres.options[getGenres.selectedIndex].text;


  //random selection of movie from array based on user genre selection
  if (selectedGenre === "Action") {
    var movieChoice = genreAction[Math.floor(Math.random() * genreAction.length)];
    console.log(movieChoice);
  }
  else if (selectedGenre === "Comedy") {
    var movieChoice = genreComedy[Math.floor(Math.random() * genreComedy.length)];
  }
  else if (selectedGenre === "Drama") {
    var movieChoice = genreDrama[Math.floor(Math.random() * genreDrama.length)];
  }
  else if (selectedGenre === "Fantasy") {
    var movieChoice = genreFantasy[Math.floor(Math.random() * genreFantasy.length)];
  }
  else if (selectedGenre === "Sci-Fi") {
    var movieChoice = genreSciFi[Math.floor(Math.random() * genreSciFi.length)];
  }
  else if (selectedGenre === "Horror") {
    var movieChoice = genreHorror[Math.floor(Math.random() * genreHorror.length)];
  }
  else if (selectedGenre === "Mystery") {
    var movieChoice = genreMystery[Math.floor(Math.random() * genreMystery.length)];
  }
  else if (selectedGenre === "Romance") {
    var movieChoice = genreRomance[Math.floor(Math.random() * genreRomance.length)];
  }
  else if (selectedGenre === "Thriller") {
    var movieChoice = genreThriller[Math.floor(Math.random() * genreThriller.length)];
  }
  // first API call to OMDB
// format api url
var apiUrl = "http://www.omdbapi.com/?t=" + movieChoice + "&apikey=8a73c1f2";

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

    // movie poster will appear for each movie
    var moviePic = data['Poster'];
    console.log(moviePic);

    var moviePoster = new Image();
    moviePoster.src = moviePic;
    moviePoster.alt = data['Plot'];
    movieEl.append(moviePoster);
  });


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
}

btn.addEventListener("click", function () {
  getSelectedGenre();
})



