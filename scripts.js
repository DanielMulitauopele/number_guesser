$(document).ready(function() {
  let min = 1
  let max = 100

  const userGuess = $("#q")
  const lastGuess = "Your last guess was"
  const highGuessMessage = "That is too high!"
  const lowGuessMessage = "That is too low!"
  const correctGuessMessage = "BOOM! Nice job! Let's start over."
  const maxGuessMessage = "That's way too high! Please guess in the range."
  const minGuessMessage = "That's way too low! Please guess in the range."
  const nanMessage = "Enter a NUMBER please. Thanks."

  const rangeStatus = `Please make a guess between ${min} and ${max}.`

  function lastGuessWas(lastGuess) {
    $('.last-guess').text(lastGuess)
  };

  function displayNumber(userGuess){
    $('.guess').text(userGuess)
  };

  function setMessage(message){
    $('.message').text(message)
  };

  function setRange(message){
    $('.range').text(message)
  };

  function randomNumber(){
    randNumber = Math.floor((Math.random() * max) + min);
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
    setRange(rangeStatus);
    randomNumber();
    clearMessages();
    $('.last-guess').text('Alright, starting fresh!')
    $('button').prop('disabled', true)
  };

  function adjustRange(){
    min = min - 10
    max = max + 10
    setRange(`Please make a new guess between ${min} and ${max}.`)
    randomNumber();
  };

  setRange(rangeStatus);
  randomNumber();

  $('.guess-button').on('click', function(){
    if (validNumber(userGuess.val()) > max){
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(maxGuessMessage)
      event.preventDefault();
    } else if (validNumber(userGuess.val()) < min){
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(minGuessMessage)
      event.preventDefault();
    } else if (validNumber(userGuess.val()) > randNumber) {
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
      adjustRange();
    };
  });

  $('.clear-button').on('click', function(){
    clearField();
    $('button').prop('disabled', true);
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
    } else {
      $('button').prop('disabled', true);
    }
  });
});
