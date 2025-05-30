const tracks = [
  { name: "20 Min - Lil Uzi Vert", file: "musics/20 Min - Lil Uzi Vert.mp3" },
  { name: "Ado 唱", file: "musics/Ado 唱.mp3" },
  { name: "Ado 神っほいな 歌いました", file: "musics/Ado 神っほいな 歌いました.mp3" },
  { name: "Beethoven - Für Elise", file: "musics/Beethoven - Für Elise.mp3" },
  { name: "Chief Keef - Dope Smokes", file: "musics/Chief Keef - Dope Smokes [Official Audio].mp3" },
  { name: "Fly-day Chinatown", file: "musics/Fly-day Chinatown.mp3" },
  { name: "I Can't Decide", file: "musics/I Can't Decide.mp3" }
];

let currentTrack = 0;
let isPlaying = false;
let isShuffle = true;
let isRepeat = false;

const audio = document.getElementById("audio");
const trackName = document.getElementById("track-name");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const musicListDiv = document.getElementById("music-list");

const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");

const volumeBtn = document.getElementById("volume-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeSlider = document.getElementById("volume");

let lastVolume = volumeSlider.value;
let isMuted = false;

shuffleBtn.style.opacity = "1";
repeatBtn.style.opacity = "0.4";

function loadTrack(index) {
  currentTrack = index;
  const track = tracks[index];
  audio.src = track.file;
  trackName.textContent = track.name;
  updateActiveTrack();
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playIcon.src = "icons/pause.svg";
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playIcon.src = "icons/play.svg";
}

playBtn.addEventListener("click", () => {
  if (isPlaying) pauseTrack();
  else playTrack();
});

document.getElementById("next-btn").addEventListener("click", () => {
  playNextTrack();
});

document.getElementById("prev-btn").addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.opacity = isShuffle ? "1" : "0.4";
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.style.opacity = isRepeat ? "1" : "0.4";
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  updateProgressBackground();
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
  updateProgressBackground();
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    playTrack();
  } else {
    playNextTrack();
  }
});

function playNextTrack() {
  if (isShuffle) {
    let nextTrack;
    do {
      nextTrack = Math.floor(Math.random() * tracks.length);
    } while (nextTrack === currentTrack && tracks.length > 1);
    currentTrack = nextTrack;
  } else {
    currentTrack = (currentTrack + 1) % tracks.length;
  }
  loadTrack(currentTrack);
  playTrack();
}

function updateActiveTrack() {
  document.querySelectorAll("#music-list div").forEach((el, idx) => {
    el.classList.toggle("active", idx === currentTrack);
  });
}

function renderTrackList() {
  tracks.forEach((track, idx) => {
    const div = document.createElement("div");
    div.textContent = track.name;
    div.addEventListener("click", () => {
      loadTrack(idx);
      playTrack();
    });
    musicListDiv.appendChild(div);
  });
}

function updateProgressBackground() {
  const val = progress.value;
  const max = progress.max || 100;
  const percentage = (val / max) * 100;
  progress.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #555 ${percentage}%, #555 100%)`;
}

function updateVolumeBackground() {
  const val = volumeSlider.value;
  const max = volumeSlider.max || 1;
  const percentage = (val / max) * 100;
  volumeSlider.style.background = `linear-gradient(to right, #22c55e 0%, #22c55e ${percentage}%, #555 ${percentage}%, #555 100%)`;
}

renderTrackList();
loadTrack(currentTrack);
updateProgressBackground();
updateVolumeBackground();


function updateVolumeIcon(volume) {
  if (isMuted) {
    volumeIcon.src = "icons/volume-x.svg";
  } else if (volume == 0) {
    volumeIcon.src = "icons/volume-off.svg";
  } else if (volume > 0 && volume <= 0.33) {
    volumeIcon.src = "icons/volume-1.svg";
  } else {
    volumeIcon.src = "icons/volume-2.svg";
  }
}

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  if (audio.volume > 0) {
    isMuted = false;
  }
  lastVolume = audio.volume;
  updateVolumeIcon(audio.volume);
  updateVolumeBackground();
});

volumeBtn.addEventListener("click", () => {
  if (!isMuted) {
    isMuted = true;
    audio.volume = 0;
    volumeSlider.value = 0;
  } else {
    isMuted = false;
    audio.volume = lastVolume || 0.5;
    volumeSlider.value = audio.volume;
  }
  updateVolumeIcon(audio.volume);
  updateVolumeBackground();
});

audio.volume = volumeSlider.value;
updateVolumeIcon(audio.volume);
updateVolumeBackground();
