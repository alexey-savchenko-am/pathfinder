export class Settings {
    constructor() {
      if (Settings.instance) {
        return Settings.instance;
      }
  
      this.tileSize = 75;
  
      Settings.instance = this;
    }
  
    get getTileSize() {
      return this.tileSize;
    }
  }