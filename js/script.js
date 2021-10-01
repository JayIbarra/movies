// first api call to OMDB
// format api url
var apiUrl = "http://www.omdbapi.com/?t=scream&apikey=8a73c1f2" ;
//make api request
fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })



//second api call 
// format api url
var foodishApiUrl = "https://foodish-api.herokuapp.com/api";
//make api request
fetch(foodishApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
