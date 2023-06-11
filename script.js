const barbearia = document.querySelector('.barbearia');
const navLinks = document.querySelector('.nav-links');

barbearia.addEventListener('click', () => {
  barbearia.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// função da box animation

window.onload = function() {
  var boxes = document.querySelectorAll('.box_cortes');
  var leftBoxes = document.querySelectorAll('.box_cortes.left');
  var rightBoxes = document.querySelectorAll('.box_cortes.right');

  for (var i = 0; i < leftBoxes.length; i++) {
    leftBoxes[i].style.animationDelay = i * 0.7 + 's';
  }

  for (var j = 0; j < rightBoxes.length; j++) {
    rightBoxes[j].style.animationDelay = j * 0.7 + 's';
  }
};








