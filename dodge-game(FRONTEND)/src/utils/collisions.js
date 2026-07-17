export function isColliding(rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.y < rectB.y + rectB.height &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y + rectA.height > rectB.y
  );
}

export function isOverlappingHorizontally(rectA, rectB) {
  return rectA.x < rectB.x + rectB.width && rectA.x + rectA.width > rectB.x;
}
