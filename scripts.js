$(document).ready(function() {
  const userGuess = $("#q")
  const highGuessMessage = "That is too high!"
  const lowGuessMessage = "That is too low!"
  const correctGuessMessage = "BOOM!"

  function displayNumber(userGuess){
    $('.guess').text(userGuess)
  };

  function setMessage(message){
    $('.message').text(message)
  };

  function randomNumber(){
    randNumber = Math.floor((Math.random() * 100) + 1);
  };

  randomNumber();

  $('.guess-button').on('click', function(){
    if (userGuess.val() > randNumber) {
      displayNumber(userGuess.val())
      setMessage(highGuessMessage)
      event.preventDefault();
    } else if (userGuess.val() < randNumber) {
      displayNumber(userGuess.val())
      setMessage(lowGuessMessage)
      event.preventDefault();
    } else {
      displayNumber(userGuess.val())
      setMessage(correctGuessMessage)
    }
  });
});
