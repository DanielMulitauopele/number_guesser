$(document).ready(function() {
  // I used let here because I anticipated these variables would change
  let min = 1
  let max = 100

  // I used const on these variables because I would not be reassigning these variables
  const userGuess = $("#q")
  const lastGuess = "Your last guess was"
  const highGuessMessage = "That is too high!"
  const lowGuessMessage = "That is too low!"
  const correctGuessMessage = "BOOM! Nice job! Let's start over."
  const maxGuessMessage = "That's way too high! Please guess in the range."
  const minGuessMessage = "That's way too low! Please guess in the range."
  const nanMessage = "Enter a NUMBER please. Thanks."
  const rangeStatus = `Please make a guess between ${min} and ${max}.`

  // This function selects the 'last-guess' class, and inserts 'text' from the
  // 'lastGuess' const
  function lastGuessWas(lastGuess) {
    $('.last-guess').text(lastGuess)
  };

  // This function selects the 'guess' class, and inserts 'text' from the
  // 'userGuess' const, which pulls from the user input
  function displayNumber(userGuess){
    $('.guess').text(userGuess)
  };

  // This function selects the 'message' class, and inserts 'text' from
  // whichever const that is used as the 'message' argument
  function setMessage(message){
    $('.message').text(message)
  };

  // This function selects the 'range' class, and inserts 'text' from whichever
  // const that is used as the 'message' argument
  function setRange(message){
    $('.range').text(message)
  };

  // This function generates the random number. The Math.random() generates a float
  // between 0 and 1 and multiplies by the max, which is defined above. This sets
  // the higher limit, and adding to the min guarantees the lower limit. Math.floor
  // rounds the number to a whole integer.
  function randomNumber(){
    randNumber = Math.floor((Math.random() * max) + min);
  };

  // This function takes the user input and verifies whether it is an integer or not.
  // The second argument of 10 is the radix, or numeral system. If it is not a number,
  // it will 'return' NaN
  function validNumber(userInput){
    parsed = parseInt(userInput, 10);
    return parsed
  };

  // This function takes the user input field, which is assigned to userGuess, clears
  // the value that is displayed
  function clearField(){
    $(userGuess).val('');
  };

  // There are multiple message classes, so this function clears all of them, by
  // selecting the classes, and setting all of the values to empty strings
  function clearMessages(){
    $('.last-guess').text('')
    $(userGuess).val('')
    displayNumber('')
    $('.message').text('')
  };

  // This function clears all messages by calling the clearMessages function, and
  // then adds a new message by selecting the message class, and inserts the
  // nanMessage const value
  function invalidEntry(message){
    clearMessages();
    $('.message').text(nanMessage)
  };

  // This function resets the max and min values to the original values
  function startingRange(){
    max = 100
    min = 1
  };

  // This function resets the game from scratch. It calls the  startingRange function,
  // and resets the max and min values. It calls the setRange function, which changes
  // the range message on top. It sets the randomNumber, clears messages, adds a new
  // message, and sets all buttons to disabled.
  function resetGame() {
    startingRange();
    setRange(rangeStatus);
    randomNumber();
    clearMessages();
    $('.last-guess').text('Alright, starting fresh!')
  // This selects all buttons, and the property for disabled, and sets it to true
    $('button').prop('disabled', true)
  };

  // This function is called after a user guess correctly, and changes the range. It
  // also changes the range message by interpolation. Finally, it chooses a new number.
  function adjustRange(){
    min = min - 10
    max = max + 10
    setRange(`Please make a new guess between ${min} and ${max}.`)
    randomNumber();
  };

  // These functions are called at the beginning of every page load
  setRange(rangeStatus);
  randomNumber();

  // The following is all JQuery cause I don't know anything about javascript. It's
  // also a really large if/else statement.

  // This code is all connected to the guess button, when it is clicked.
  $('.guess-button').on('click', function(){
    // If the user guess is higher than the max value, it shows the last guess message,
    // shows the last guess value, and delivers the max message. It also prevents
    // the code from continuing on after an incorrect guess
    if (validNumber(userGuess.val()) > max){
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(maxGuessMessage)
      event.preventDefault();
    // If the user guess is lower than the min value, it shows the last guess message,
    // shows the last guess value, and delivers the min message. It also prevents
    // the code from continuing on after an incorrect guess
    } else if (validNumber(userGuess.val()) < min){
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(minGuessMessage)
      event.preventDefault();
    // If the user guess is higher than the correct number, it shows the last
    // guess message, shows the last guess value, and delivers the high guess message. It
    // also prevents the code from continuing on after an incorrect guess
    } else if (validNumber(userGuess.val()) > randNumber) {
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(highGuessMessage)
      event.preventDefault();
    // If the user guess is lower than the correct number, it shows the last
    // guess message, shows the last guess value, and delivers the low guess message. It
    // also prevents the code from continuing on after an incorrect guess
    } else if (validNumber(userGuess.val()) < randNumber) {
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(lowGuessMessage)
      event.preventDefault();
    // If the user guess is equal to the correct number, it shows the last
    // guess message, shows the last guess value, and delivers the correct guess
    // message. It also adjusts/expands the range.
    } else if (validNumber(userGuess.val()) == randNumber){
      lastGuessWas(lastGuess)
      displayNumber(userGuess.val())
      setMessage(correctGuessMessage)
      adjustRange();
    };
  });

  // When the clear button is clicked, it wipes the field clean, and sets all buttons
  // to be disabled.
  $('.clear-button').on('click', function(){
    clearField();
    $('button').prop('disabled', true);
  });

  // When the reset button is clicked, it calls the reset game function
  $('.reset').on('click', function(){
    resetGame();
  });

  // When a user presses and releases a button (keyup), the isNaN function checks
  // whether the validNumber function has returned a number or not from the user
  // input. If the user inputs anything that is not a number, the if condition is
  // met, and the field is cleared, the nanMessage is displayed, and the program
  // stops. Otherwise, the program procedes as normal, and the message text is wiped.
  $(userGuess).on('keyup', function(){
    if (isNaN(validNumber(userGuess.val()))) {
      clearField();
      invalidEntry(nanMessage)
      event.preventDefault();
    } else {
      $('.message').text('')
    }
  });

  // If the input fields do not equal an empty string, then the buttons are enabled.
  // Otherwise, they are disabled.
  $(userGuess).on('keyup', function(){
    if (userGuess.val() != '') {
      $('button').prop('disabled', false);
    } else {
      $('button').prop('disabled', true);
    }
  });
});
