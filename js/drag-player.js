const player = document.getElementById("music-player");
const dragHandle = player.querySelector(".track-info");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

window.addEventListener("load", () => {
  const left = window.innerWidth - player.offsetWidth - 20;
  const top = window.innerHeight - player.offsetHeight - 20;
  player.style.position = "fixed";
  player.style.left = left + "px";
  player.style.top = top + "px";
  player.style.cursor = "default";
  dragHandle.style.cursor = "grab";
});

dragHandle.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - player.getBoundingClientRect().left;
  offsetY = e.clientY - player.getBoundingClientRect().top;
  player.style.cursor = "grabbing";
  dragHandle.style.cursor = "grabbing";
  e.preventDefault();
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    player.style.cursor = "default";
    dragHandle.style.cursor = "grab";
  }
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let left = e.clientX - offsetX;
  let top = e.clientY - offsetY;

  const maxLeft = window.innerWidth - player.offsetWidth;
  const maxTop = window.innerHeight - player.offsetHeight;

  if (left < 0) left = 0;
  else if (left > maxLeft) left = maxLeft;

  if (top < 0) top = 0;
  else if (top > maxTop) top = maxTop;

  player.style.left = left + "px";
  player.style.top = top + "px";
});
