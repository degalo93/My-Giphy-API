//Inital topics that I will look for in gif
var games = ["Paper Mario", "Mario Kart", "Pokemon", "Legend of Zelda", "Donkey Kong 64", "Kirby", "Super Mario Maker", ];

//need to create something that will show the gifs
function displayGameGifs() {
    var game = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the game /topic
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        game + "&api_key=OkTiJu8wDseohADATaJsTUYxeL3AOg0q&limit=10";

    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);


                    // Creating an image tag
                    var gameImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    gameImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and gameIMage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(gameImage);


                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#videoGame-view").prepend(gifDiv);
                }
            }
        });
}

function renderButtons() {

    // Deletes the games prior to adding new game
    // (this is necessary otherwise you will have repeat buttons)
    $("#gameGifbuttons").empty();
    // Loops through the array of game
    for (var i = 0; i < games.length; i++) {

        // Then dynamicaly generates buttons for each game in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of game to our button
        a.addClass("game");

        // Added a data-attribute
        a.attr("data-name", games[i]);
        // Provided the initial button text
        a.text(games[i]);
        // Added the button to the buttons-view div
        $("#gameGifbuttons").append(a);
    }
}



$("#add-videoGame").on("click", function(event) {
    event.preventDefault();
    var buttonText = $("#videoGame-input").val().trim();
    games.push(buttonText);
    renderButtons();
});



renderButtons();

$(document).on("click", ".game", displayGameGifs);