'use strict';

$.getJSON(
  'https://api.openweathermap.org/data/2.5/weather?q=Tel%20Aviv&units=metric&appid=ce3a6af75434d90c5094c585efca134e',
  function (data) {
    console.log(data);
    var icon =
      'https://api.openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    var temp = Math.floor(data.main.temp) + ' °C';
    var weather = data.weather[0].main;
    var city = data.name;

    $('.icon').attr('src', icon);
    $('.temp').append(temp);
    $('.weather').append(weather);
    $('.city').append(city);
    //    $('.temp').attr('src', temp);
    console.log(temp);
    console.log(weather);
  }
);

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore;
const button = document.querySelector('.check');

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // where there is no input
  if (!guess) {
    displayMessage('⛔ No number! ');

    // where player win
  } else if (guess === secretNumber) {
    displayMessage('😎 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    button.disabled = true;

    if (score > highScore) {
      highScore === score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'To high!' : 'To low!');

      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('🧨You lost the game!');

      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  if (document.querySelector('.highscore').textContent < score) {
    document.querySelector('.highscore').textContent = score;
  }
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  button.disabled = false;
});
