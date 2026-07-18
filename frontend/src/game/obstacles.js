export const obstacles = [];

export function spawnObstacle(canvas, speed) {
  obstacles.push({
    x: Math.random() * (canvas.width - 40),
    y: -40,
    width: 15,
    height: 15,
    speed,
  });
}

export function updateObstacles(obstacles) {
  let wallExists = false;

  obstacles.forEach((o) => {
    o.y += o.speed;
    if (o.height === 20) wallExists = true;
  });

  return wallExists;
}

export function removeOffscreen(obstacles, canvas) {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
    }
  }
}