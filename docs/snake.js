const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const grid = 20;
let snake = [{x: 160, y: 200}];
let dx = grid;
let dy = 0;
let apple = randomApple();
let count = 0;

function randomApple() {
  return {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid
  };
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && dx === 0) { dx = -grid; dy = 0; }
  else if (e.key === 'ArrowUp' && dy === 0) { dy = -grid; dx = 0; }
  else if (e.key === 'ArrowRight' && dx === 0) { dx = grid; dy = 0; }
  else if (e.key === 'ArrowDown' && dy === 0) { dy = grid; dx = 0; }
});

function loop() {
  requestAnimationFrame(loop);
  if (++count < 6) return; // slow down to 10fps
  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move snake by adding head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // wrap around screen
  if (head.x >= canvas.width) head.x = 0;
  if (head.x < 0) head.x = canvas.width - grid;
  if (head.y >= canvas.height) head.y = 0;
  if (head.y < 0) head.y = canvas.height - grid;
  snake.unshift(head);

  // check apple collision
  if (head.x === apple.x && head.y === apple.y) {
    apple = randomApple();
  } else {
    snake.pop();
  }

  // draw apple
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

  // draw snake
  ctx.fillStyle = 'lime';
  snake.forEach((cell, index) => {
    ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
    // check self collision
    for (let i = index + 1; i < snake.length; i++) {
      if (cell.x === snake[i].x && cell.y === snake[i].y) {
        snake = [{x: 160, y: 200}];
        dx = grid;
        dy = 0;
        apple = randomApple();
      }
    }
  });
}

requestAnimationFrame(loop);
