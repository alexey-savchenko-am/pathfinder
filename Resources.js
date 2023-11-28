class Resources {
    constructor() {
      
      this.toLoad = {
        ground: "/assets/img/grass.png",
        water: "/assets/img/water.png",
        sand: "/assets/img/sand.jpg",
        hero: "/assets/img/hero.png",
        coin: "/assets/img/coin.svg"
      };
  
      this.images = {};
  
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
    }
  }
  
export const resources = new Resources();
  