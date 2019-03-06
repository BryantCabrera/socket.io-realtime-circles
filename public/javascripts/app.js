// get our connection to the socket.io server
const socket = io();
console.log(socket, ' this is socket from app.js.');
const circles = document.getElementById('circles');
// players <ul> element in the footer
const players = document.getElementById('players');
let initials = '';

// listen to the server for the `add-circle` event
socket.on('add-circle', function (data) {
  // console.log(data);

  addCircle(data);
});

socket.on('clear', function (data) {
  //my way
  // clear();

  circles.innerHTML = '';
});

socket.on('update-player-list', function (data) {
  console.log(data, ' data from app.js update-player-list');
  // const playerList = data.map(initials => {return `<li>${initials}</li>`});
  players.innerHTML = data.map(initials => {return `<li>${initials}</li>`});
});

circles.addEventListener('click', function(evt) {
  // addCircle(evt.clientX, evt.clientY, randomBetween(10,125), getRandomRGBA());

  // replace code above with this code
  socket.emit('add-circle', {
    initials: initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10,100),
    rgba: getRandomRGBA()
  });
});

//CLEAR before socket refactor
// document.getElementsByTagName('button')[0].addEventListener('click', function() {
//   circles.innerHTML = '';
// });

//CLEAR with socket refactor
document.getElementsByTagName('button')[0].addEventListener('click', function () {
  socket.emit('clear', {
    initials: initials
  });
});

//my way
// function clear() {
//   circles.innerHTML = '';

//   socket.emit('clear', {
//     initials: initials
//   });
// }

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);
//sends initials to server
socket.emit('register-player', initials);

function getInitials() {
  var input = prompt("Please enter your initials.");

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
