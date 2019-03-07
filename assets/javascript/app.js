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

                    gameImage.attr("src", results[i].images.fixed_height_still.url);
                    gameImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gameImage.attr("data-animate", results[i].images.fixed_height.url);
                    gameImage.attr("data-state", "still");
                    gameImage.addClass("cool");
                    // Appending the paragraph and gameIMage we created to the "gifDiv" div we created

                    gifDiv.append(gameImage);
                    gifDiv.append(p);

                    $("#videoGame-view").prepend(gifDiv);
                }
            }
        });
}

function renderButtons() {

    // empty gameGifButton before to adding new search

    $("#gameGifbuttons").empty();
    // Loops through the array of game
    for (var i = 0; i < games.length; i++) {

        //need to make button from the array
        var a = $("<button>");
        // Adds a class of game to our button
        a.addClass("game");
        a.addClass("btn btn-light");
        // Added a data-attribute
        a.attr("data-name", games[i]);
        // Provided the initial button text
        a.text(games[i]);
        // Added the button to the buttons-view div
        $("#gameGifbuttons").append(a);
    }
}

//when you finish typing in the box it will add your input to make a button

$("#add-videoGame").on("click", function(event) {
    event.preventDefault();
    var buttonText = $("#videoGame-input").val().trim();

    games.push(buttonText);
    renderButtons();
});


renderButtons();

$(document).on("click", ".game", displayGameGifs);
$(document).on("click", ".cool", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});