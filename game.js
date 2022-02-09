var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  var norm = ("#" + randomChosenColour);
  $(norm).fadeOut(100).fadeIn(100);
  var pun = randomChosenColour;
  playSound(pun);
  level++;
  $("h1").text("Level " + level);
}


$(".btn").on("click", function(event) {
  var userChosenColour = (event.target.id);
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
  var name = new Audio("sounds/" + name + ".mp3");
  name.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        console.log("success");
        nextSequence();
        userClickedPattern.length = 0;
      }, 1000)
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("You Dumb Bitch, Press Any Key To Restart");
    // console.log("wrong");
    startOver();

  }

}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  started = false;
  userClickedPattern.length = 0;
}





$(document).keydown(function() {
  if (!started) {
    $("h1").text("Level " + level);
    setTimeout(function() {
      nextSequence()
    }, 1000);

    started = true;
  }
});
