import landscape from "./assets/img/landscape.png";
import hero from "./assets/img/hero.png";
import coin from "./assets/img/coin.svg";
import candle from "./assets/img/candle.png";
import light from "./assets/img/light.png";

class Resources {
    constructor() {
      
      this.toLoad = {
        landscape,
        hero,
        coin,
        candle,
        light
      };

            
      this.toLoadSounds = {
        coin: "/assets/sound/coin.wav",
        move: "/assets/sound/move.wav",
        break: "/assets/sound/break.mp3",
      };
  
      this.images = {};
      this.sounds = {};
  
      Object.keys(this.toLoad).forEach(key => {
        const img = new Image();
        img.src = this.toLoad[key];
        this.images[key] = {
          image: img,
          isLoaded: false
        }
        img.onload = () => {
          this.images[key].isLoaded = true;
        }
      })

      const ac = new window.AudioContext;

      Object.keys(this.toLoadSounds).forEach(key => {
        
        fetch(this.toLoadSounds[key])
          .then(response => response.arrayBuffer())
          .then(data => ac.decodeAudioData(data))
          .then(buffer => {
            this.sounds[key] = buffer;
          })
          .catch(error => console.error('Error on downloading:', error));
      });
    }
  }
  
export const resources = new Resources();
  