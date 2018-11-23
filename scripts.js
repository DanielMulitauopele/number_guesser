$(document).ready(function() {
  $('.guess-button').on('click', function(){
    var userGuess = $("#q")
    const randNumber = Math.floor((Math.random() * 100) + 1);

    const tooHighGuess = "That is too high!"
    const tooLowGuess = "That is too low!"
    const correctGuess = "BOOM!"

    if (userGuess.val() > randNumber) {
      displayNumber(userGuess.val())
      setMessage(tooHighGuess)
      event.preventDefault();
    } else if (userGuess.val() < randNumber) {
      displayNumber(userGuess.val())
      setMessage(tooLowGuess)
      event.preventDefault();
    } else {
      displayNumber(userGuess.val())
      setMessage(correctGuess)
    }

    function displayNumber(userGuess){
      $('.guess').text(userGuess)
    };

    function setMessage(message){
      $('.message').text(message)
    };
  });
});
