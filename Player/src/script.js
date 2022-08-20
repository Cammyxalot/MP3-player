const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const title = document.getElementById("title")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const volumeBtn = document.getElementById("volume-button")
const songs = [
  "Bloc Party - Helicopter",
  "Nedaj - Code",
  "No Pressure - Big man",
  "Sticky Fingers - How to fly",
  "The Garden - California here we go",
  "The Garden - Sneaky devil",
]
songIndex = 1

loadSong(songs[songIndex])
function loadSong(song) {
  title.innerText = song
  audio.src = `./Player/Music/${song}.mp3`
  cover.src = `./Cover/${song}.jpeg`
}
// function to play and stop the music

playBtn.addEventListener("click", function playSong() {
  //   console.log("test")
  if (!audio.paused) {
    audio.pause()
    // console.log("pause")
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fas").classList.remove("fa-pause")
    playBtn.querySelector("i.fas").classList.add("fa-play")
  } else {
    // console.log("play")
    audio.play()
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
  }
})

//function to update the duration bar

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement
  const ProgressPercentage = (currentTime / duration) * 100
  progress.style.width = `${ProgressPercentage}%`
})

//function to manually change the timestamp of the music

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clickX / width) * duration
})

// automatically change the music once previous one ended

audio.addEventListener("ended", nextSong)

// manually change to next song

nextBtn.addEventListener("click", nextSong)

function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  if (audio.paused) {
    audio.play()
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
  }
}

//manually change to previous song

prevBtn.addEventListener("click", () => {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  if (audio.paused) {
    audio.play()
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
  }
})

volumeBtn.addEventListener("input", () => {
  // console.log(volumeBtn.value)
  audio.volume = volumeBtn.value / 100
  // console.log(audio.volume)
})
