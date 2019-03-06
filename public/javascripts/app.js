// get our connection to the socket.io server
var socket = io();
console.log(socket, ' this is socket from app.js.');

// listen to the server for the `add-circle` event
socket.on('add-circle', function (data) {
  console.log(data);
});

var circles = document.getElementById('circles');
var initials = '';

circles.addEventListener('click', function(evt) {
  // addCircle(evt.clientX, evt.clientY, randomBetween(10,125), getRandomRGBA());

  // replace current line of code with this code
  socket.emit('add-circle', {
    initials: initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10,100),
    rgba: getRandomRGBA()
  });
});

document.getElementsByTagName('button')[0].addEventListener('click', function() {
  circles.innerHTML = '';
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);

function getInitials() {
  var input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

// function addCircle(x, y, dia, rgba) {
// refactor with destructuring to account for object passed in from server's emit message
function addCircle({x, y, dia, rgba, initials}) {
  var el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
    randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
}
