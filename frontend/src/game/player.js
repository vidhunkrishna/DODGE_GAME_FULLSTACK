export const player = {
  x: 200,
  y: 200,
  width: 50,
  height: 50,
  speed: 5,
};

export function movePlayer(player, key, canvas) {
  if (key["ArrowLeft"]) player.x -= player.speed;
  if (key["ArrowRight"]) player.x += player.speed;
  if (key["ArrowUp"]) player.y -= player.speed;
  if (key["ArrowDown"]) player.y += player.speed;

  // bounds
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width)
    player.x = canvas.width - player.width;

  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height)
    player.y = canvas.height - player.height;
}