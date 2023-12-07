class SoundPlayer {
    constructor() {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.isPlaying = false;
    }

    playSound(soundBuffer) {
      if (!soundBuffer) {
        console.error('Not loaded');
        return;
      }

      /*
      if (this.isPlaying) {
        return;
      }*/
  
      const source = this.audioContext.createBufferSource();
      source.buffer = soundBuffer;
      source.connect(this.audioContext.destination);
  
      source.onended = () => {
        this.isPlaying = false;
      };
  
      source.start();
      this.isPlaying = true;

      setTimeout(() => {
        if (this.isPlaying) {
          source.stop();
          this.isPlaying = false;
        }
      }, 1000);

    }
}

export const soundPlayer = new SoundPlayer();
  