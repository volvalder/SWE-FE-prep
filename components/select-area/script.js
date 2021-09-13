const area = document.querySelector('.area');
const rect = area.getBoundingClientRect();
const selection = document.querySelector('.selection');
const point = document.querySelector('.static-point');
const boxes = document.querySelectorAll('.box');

area.addEventListener('mousedown', (e) => {
  const [x, y] = [e.clientX - rect.x, e.clientY - rect.y];

  point.classList.add('placed');
  point.style.left = x + 'px';
  point.style.top = y + 'px';
});

area.addEventListener('mouseup', () => {
  if(point.classList.contains('placed')) {
    point.classList.remove('placed');
    selection.style.width = 0;
    selection.style.height = 0;
  }
});

area.addEventListener('mousemove', (e) => {
  if(!point.classList.contains('placed')) return;
  
  const {x, y} = point.getBoundingClientRect();
  const [newX, newY] = [e.clientX - x, e.clientY - y];
  const [width, height] = [Math.abs(x - e.clientX), Math.abs(y - e.clientY)];

  selection.style.width = width + 'px';
  selection.style.height = height + 'px';

  if(newX < 0 && newY < 0) {
    selection.dir = 'top-left';
  } else if(newX < 0 && newY > 0) {
    selection.dir = 'bot-left';
  } else if(newX > 0 && newY > 0) {
    selection.dir = 'bot-right';
  } else {
    selection.dir = 'top-right';
  }

  boxes.forEach((box) => {
    if(box.classList.contains('selected')) box.classList.remove('selected');
    if(isIntersecting(box, selection)) box.classList.add('selected');
  });
});

function isIntersecting(box, selection) {
  const {top, left, bottom, right, width, height} = box.getBoundingClientRect();
  const rect = selection.getBoundingClientRect();

  return (top + height > rect.top
    && left + width > rect.left
    && top < rect.bottom
    && left < rect.right);
}
