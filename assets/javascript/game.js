// Create initial array of dog breeds
var puppyArray = [
    "Boston Terrier",
    "Golden Retriever",
    "Rottweiler",
    "Pug",
    "Bulldog",
    "Great Dane",
    "Husky",
    "German Shephard",
  ];
  
  // Create function to display a button for each item in the puppy array
  function createButtons() {
    $("#buttons").empty();
  
    // Create a for loop that goes through the puppy array and creates a button for each item
    for (var i = 0; i < puppyArray.length; i++) {
  
      var button = $("<button>");
      button.addClass("puppyButton");
      button.attr("data-puppy", puppyArray[i]);
      button.text(puppyArray[i]);
  
      // Append the buttons in the HTML
      $("#buttons").append(button);
    }
  }
  
  // Create event handler to add new dog breeds to the puppy array
  $("#add-breed").on("click", function (event) {
    event.preventDefault();
  
    // Retrieve user input and then add it to the puppy array
    var animal = $("#breed-input").val().trim();
    puppyArray.push(animal);
    $("#breed-input").val("");
  
    // Call createButtons function to create a button for the new item added to the puppy array
    createButtons();
  });
  
  // Create function to get the gifs from the Giphy API
  function getGifs() {
    var breedName = $(this).attr("data-puppy");
    var breedString = breedName.split(" ").join("+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breedString +
      "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";
  
    // AJAX call to Giphy API
    $.ajax({
      method: "GET",
      url: queryURL,
    })
      .done(function (result) {
  
        var dataArray = result.data;
  
        // Create new divs for each of the images returned from Giphy API
        $("#gifs").empty();
        
        for (var i = 0; i < dataArray.length; i++) {
          
          var newDiv = $("<div>");
          newDiv.addClass("puppyGif");
  
          var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
          newDiv.append(newRating);
  
          var newImg = $("<img>");
          newImg.attr("src", dataArray[i].images.fixed_height_still.url);
          newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
          newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
          newImg.attr("data-state", "still");
          newDiv.append(newImg);
  
          // Append Gifs to the new divs created above
          $("#gifs").append(newDiv);
        }
      });
  }
  
  // Create function to animate images
  function animatepuppyGif() {
    // Images can either be animated or stay still
    var state = $(this).find("img").attr("data-state");
  
    if (state === "still") {
      $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
      $(this).find("img").attr("data-state", "animate");
  
    } else {
      $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
      $(this).find("img").attr("data-state", "still");
    }
  }
  
  $(document).ready(function () {
    createButtons();
  });
  
  // Create event handler to retrieve the correct gifs based on which button was clicked
  $(document).on("click", ".puppyButton", getGifs);
  
  // Create event handler to animate/still the gifs upon click
  $(document).on("click", ".puppyGif", animatepuppyGif);