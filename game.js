var level = 0;
var started = false;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// Generating numbers for Gamepattern..
function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("h1").text("Level:" + level);
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(200)
    .fadeIn(200);
  //alert( randomChosenColour+"colour light up")

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").click(function () {
  //console.log($(this).attr("id"));
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  $("#" + userChosenColour)
    .fadeOut(200)
    .fadeIn(200);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var length = userClickedPattern.length;
  var index = length - 1;
  checkAnswer(index);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  //$(selector).animate({params},speed,callback);
  $("#" + currentColour).addClass("pressed");
  setTimeout(removeclass, 100);
  function removeclass() {
    $("#" + currentColour).removeClass("pressed");
  }
}

//It will work only one time when game start.....
$(document).on("keypress", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Failure");
    playSound("wrong");
    $("body").addClass("game-over ");
    setTimeout(removeclass, 800);
    function removeclass() {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
    }
    setTimeout(startOver, 2000);
    function startOver() {
      userClickedPattern = [];
      gamePattern = [];
      started = false;
      level = 0;
    }
  }
}
