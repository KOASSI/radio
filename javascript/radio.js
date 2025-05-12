const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');
let isPlaying = false;

playButton.addEventListener('click', function() {
  if (isPlaying) {
    audioPlayer.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i> Écouter';
  } else {
    audioPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
  }
  isPlaying = !isPlaying;
});