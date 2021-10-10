//variable to store a reference to DOM element
var foodishEl = document.querySelector("#image-div");
var movieEl = document.querySelector(".movie-info");
var btn = document.querySelector(".button");
var movieDetailEl = document.querySelector(".movie-details");


// 5 movies for each genre
// randomly select with Math.random
var genreAction = ['Gladiator', 'Black Panther', 'Kill Bill', 'John Wick', 'Die Hard'];
var genreComedy = ['Shaun of the Dead', 'Kiss Kiss, Bang Bang', 'The 40-Year-Old Virgin', 'Borat', 'Superbad'];
var genreDrama = ['Citizen Kane', 'Parasite', 'Casablanca', 'Knives Out', 'Lady Bird'];
var genreFantasy = ['The Hobbit', 'Ladyhawke', 'Solomon Kane', 'Clash of the Titants', 'The Forbidden Kingdom'];
var genreSciFi = ['The Wizard of Oz', 'Avengers: Endgame', 'Toy Story 4', 'Spider-Man', 'Wonder Woman'];
var genreHorror = ["Rosemary's Baby", "The Exorcist", "The Conjuring", "Scream", "Sinister"];
var genreMystery = ["The Girl on the Train", "Clue", "The Fugitive", "Donnie Darko", "Mystic River"];
var genreRomance = ["Love Actually", "The Notebook", "Dirty Dancing", "Pretty Woman", "Titanic"];
var genreThriller = ["Split", "Basic Instinct", "Memento", "Eyes Wide Shut", "Candyman"];


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
movieEl.innerHTML="";
//make api request
fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //grabs the details of the movie from the API
    var movieTitle = data["Title"];
    var movieRatingS = data.Ratings[1].Source;
    var movieRatingV = data.Ratings[1].Value;
    var movieYear = data["Year"];
    var movieActors = data["Actors"];
    var moviePlot = data["Plot"];
    console.log(movieRatingS,movieRatingV);
    // post movie details above poster - TRY AND GET TO RIGHT SIDE OF POSTER
    movieDetailEl.innerHTML = "Title: " + movieTitle +  "<br>" + "Year: " + movieYear +  "<br>" +
    "Actors: " + movieActors +  "<br>" + "Plot: " + moviePlot +  "<br>" + "Rating: " + movieRatingS + " - " + movieRatingV + "<br><br>";
    

    // movie poster will appear for each movie
    var moviePic = data['Poster'];

    var moviePoster = new Image();
    moviePoster.src = moviePic;
    moviePoster.alt = data['Plot'];
    moviePoster.setAttribute('style', 'height:auto; width:100%');
    movieEl.append(moviePoster);
    // call setMovies to local storage here
    setMovieToLocalStorage(movieTitle);
    
  });


//second api call 
// format api url
var foodishApiUrl = "https://foodish-api.herokuapp.com/api";
foodishEl.innerHTML="";
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
      imageEl.setAttribute('style', 'height:350px; width:325px');
      //append to <div> container
      foodishEl.appendChild(imageEl);
    });
  });
}

btn.addEventListener("click", function () {
  getSelectedGenre();
})

// Save random movie suggestions to localStorage using `setItem()`

function setMovieToLocalStorage(title) {
  // add movie to local storage
  var movieArray = JSON.parse(localStorage.getItem('movieTitles')) || [];
  movieArray.push(title);
  localStorage.setItem('movieTitles', JSON.stringify(movieArray));
  getMoviesFromLocalStorage()
  // CALL get movies from local storage
}

function getMoviesFromLocalStorage() {
  // get movies from local storage 
  var previousResultsHolder = document.getElementById("previous-searches")
  previousResultsHolder.innerHTML = ""
  var movieArray = JSON.parse(localStorage.getItem('movieTitles')) || [];
  if (movieArray.length <= 0) {
    var h3 = document.createElement("h3")
    h3.textContent = "no searches yet"
    previousResultsHolder.appendChild(h3)
  }
  else {
    var ul = document.createElement("ul")
    for (i = 0; i < movieArray.length; i++) {
      var li = document.createElement("li")
      li.textContent = movieArray[i];
      ul.appendChild(li)
    }
    previousResultsHolder.appendChild(ul);
  }
  // AND
  // display them (if none, display no movies searched message)
}

function clearMoviesFromLocalStorage() {
  localStorage.clear()
  getMoviesFromLocalStorage()
  // clear the local storage
  // CALL get movies from local storage
}

document.getElementById("clear-previous-searches").addEventListener("click", clearMoviesFromLocalStorage)