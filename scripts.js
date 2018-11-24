$(document).ready(function() {
  const userGuess = $("#q")
  const lastGuess = "Your last guess was"
  const highGuessMessage = "That is too high!"
  const lowGuessMessage = "That is too low!"
  const correctGuessMessage = "BOOM!"
  const nanMessage = "Enter a NUMBER! please. Geez."

  function lastGuessWas(lastGuess) {
    $('.last-guess').text(lastGuess)
  };

  function displayNumber(userGuess){
    $('.guess').text(userGuess)
  };

  function setMessage(message){
    $('.message').text(message)
  };

  function randomNumber(){
    randNumber = Math.floor((Math.random() * 100) + 1);
  };

  // Still working on this function for validating number

  function validNumber(userInput){
    parsed = parseInt(userInput, 10);
    return parsed
  };

  function invalidEntry(message){
    $('.last-guess').text('')
    $(userGuess).val('')
    displayNumber('')
    $('.message').text(nanMessage)
  };

  function resetGame() {
    randomNumber();
    $('.last-guess').text('Alright, starting fresh!')
    $(userGuess).val('')
    displayNumber('')
    $('.message').text('')
  };

  randomNumber();

  $('.guess-button').on('click', function(){
    if (validNumber(userGuess.val()) > randNumber) {
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(highGuessMessage)
      event.preventDefault();
    } else if (validNumber(userGuess.val()) < randNumber) {
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(lowGuessMessage)
      event.preventDefault();
    } else if (validNumber(userGuess.val()) == randNumber){
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(correctGuessMessage)
    } else if (isNaN(validNumber(userGuess.val()))) {
      invalidEntry(nanMessage);
    }
  });

  $('.clear-button').on('click', function(){
    $(userGuess).val('');
  });

  $('.reset').on('click', function(){
    resetGame();
  });
});
