import { isOverlappingHorizontally } from "../utils/collisions";

export function spawnLaser(lasers, laserloadingaud, canvasWidth) {
  laserloadingaud.currentTime = 0;
  laserloadingaud.play().catch(() => {});
  lasers.push({
    x: Math.random() * (canvasWidth - 40),
    warningtime: 60,
    activeTime: 30,
    active: false,
    width: 40,
  });
}

export function updateLasers(lasers, player, invincibletime, hasshield) {
  let collisionState = {
    hasCollision: false,
    collisionPos: { x: 0, y: 0 },
    invincibletime,
    hasshield,
    triggerGameover: false,
  };

  lasers.forEach((laser, index) => {
    if (!laser.active) {
      laser.warningtime--;
      if (laser.warningtime <= 0) {
        laser.active = true;
      }
    } else {
      laser.activeTime--;
      if (
        collisionState.invincibletime <= 0 &&
        isOverlappingHorizontally(player, laser)
      ) {
        collisionState.hasCollision = true;
        collisionState.collisionPos.x = player.x + player.width / 2;
        collisionState.collisionPos.y = player.y + player.height / 2;

        if (!collisionState.hasshield) {
          collisionState.triggerGameover = true;
        } else {
          collisionState.hasshield = false;
          collisionState.invincibletime = 30;
        }
      }

      if (laser.activeTime <= 0) {
        lasers.splice(index, 1);
      }
    }
  });

  return collisionState;
}
