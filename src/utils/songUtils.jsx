export const playSong = (audioRef, action) => {
  action();
  audioRef.current.play();
};

export const scrollToCurrentPlaying = song => {
  const currentTrack = document.getElementById(song.id);
  if (currentTrack) {
    const topPos = currentTrack.offsetTop;
    const container = document.getElementById('playlist-section');

    document.getElementById('playlist-section').scrollTop =
      topPos - container.offsetTop;
  }
};
