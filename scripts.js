$(document).ready(function() {
  const userGuess = $("#q")
  const lastGuess = "Your last guess was"
  const highGuessMessage = "That is too high!"
  const lowGuessMessage = "That is too low!"
  const correctGuessMessage = "BOOM!"
  const nanMessage = "Enter a NUMBER please. Thanks."

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

  function validNumber(userInput){
    parsed = parseInt(userInput, 10);
    return parsed
  };

  function clearField(){
    $(userGuess).val('');
  };

  function clearMessages(){
    $('.last-guess').text('')
    $(userGuess).val('')
    displayNumber('')
    $('.message').text('')
  };

  function invalidEntry(message){
    clearMessages();
    $('.message').text(nanMessage)
  };

  function resetGame() {
    randomNumber();
    clearMessages();
    $('.last-guess').text('Alright, starting fresh!')
    $('button').prop('disabled', true)
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
    };
  });

  $('.clear-button').on('click', function(){
    clearField();
  });

  $('.reset').on('click', function(){
    resetGame();
  });

  $(userGuess).on('keyup', function(){
    if (isNaN(validNumber(userGuess.val()))) {
      clearField();
      invalidEntry(nanMessage)
      event.preventDefault();
    } else {
      $('.message').text('')
    }
  });

  $(userGuess).on('keyup', function(){
    if (userGuess.val() != '') {
      $('button').prop('disabled', false);
    }
  });
});
