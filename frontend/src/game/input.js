export const key = {};

export function setupInput() {
  window.addEventListener("keydown", (e) => {
    key[e.key] = true;
  });

  window.addEventListener("keyup", (e) => {
    key[e.key] = false;
  });
}