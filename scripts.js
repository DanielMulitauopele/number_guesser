$(document).ready(function() {
  const userGuess = $("#q")
  const lastGuess = "Your last guess was"
  const highGuessMessage = "That is too high!"
  const lowGuessMessage = "That is too low!"
  const correctGuessMessage = "BOOM!"

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

  // function validNumber(userInput){
  //   parseInt(userInput, 10);
  // };

  function resetGame() {
    randomNumber();
    $('.last-guess').text('Alright, starting fresh!')
    $(userGuess).val('')
    displayNumber('')
    $('.message').text('')
  };

  randomNumber();

  $('.guess-button').on('click', function(){
    if (userGuess.val() > randNumber) {
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(highGuessMessage)
      event.preventDefault();
    } else if (userGuess.val() < randNumber) {
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(lowGuessMessage)
      event.preventDefault();
    } else {
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(correctGuessMessage)
    }
  });

  $('.clear-button').on('click', function(){
    $(userGuess).val('');
  });

  $('.reset').on('click', function(){
    resetGame();
  });
});
