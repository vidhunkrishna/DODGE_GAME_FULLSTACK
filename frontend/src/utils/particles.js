export function spawnparticles(particles, x, y) {
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 8,
      speedY: (Math.random() - 0.5) * 8,
      life: 40,
    });
  }
}

export function spawntrail(particles, player) {
  particles.push({
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    size: 3,
    speedX: (Math.random() - 0.5) * 1,
    speedY: (Math.random() - 0.5) * 1,
    life: 20,
  });
}
