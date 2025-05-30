document.addEventListener("mousemove", (e) => {
  const logo = document.getElementById("bg-logo");
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  logo.style.transform = `translate(-50%, -50%) rotateX(${y}deg) rotateY(${x}deg)`;
});
