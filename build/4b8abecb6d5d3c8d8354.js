import{GameObject}from"../GameObject.js";import{CroppableSprite,Sprite}from"../Sprite.js";import{resources}from"../../Resources.js";import{generateMaze}from"../helpers/generateMaze.js";import{createTerrain}from"../terrain.js";import{Vector2D,VectorMap}from"../Vector2D.js";import{DisplayMode,Tile}from"./Tile.js";import{soundPlayer}from"../../SoundPlayer.js";import{events}from"../../Events.js";import{Coin}from"./Coin.js";import{coinAnimationPattern}from"../animation/objectAnimationPatterns.js";import{Animation}from"../animation/Animation.js";import{Settings}from"../../Settings.js";import{lightAnimationPattern}from"../animation/objectAnimationPatterns.js";import{Light}from"./Light.js";import{calculateLighting}from"../helpers/calculateLighting.js";export class TileSet{constructor(){const e=new Settings;this._tileSize=e.tileSize,this._tileMap=new VectorMap;const t=new CroppableSprite({resource:resources.images.landscape,frameSize:new Vector2D(335,334),hFrames:2,vFrames:2});this.darkWallTerrain=createTerrain(1,!1,t,1),this.lightWallTerrain=createTerrain(1,!1,t,0),this.darkSandTerrain=createTerrain(1,!0,t,3),this.lightSandTerrain=createTerrain(1,!0,t,2);const i=new CroppableSprite({resource:resources.images.coin,frameSize:new Vector2D(256,324),hFrames:6,vFrames:6});this._coinAnimation=new Animation(i,coinAnimationPattern);const r=new CroppableSprite({resource:resources.images.light,frameSize:new Vector2D(150,150),hFrames:4,vFrames:4});this._lightAnimation=new Animation(r,lightAnimationPattern),events.on("OBJECT_THROWING",this,(({object:e,position:t})=>{const i=this.getIntersectingTile(t);i&&!i.terrain.getIsPassable()&&(e.stopThrowing(),this.setSandTerrain(i),soundPlayer.playSound(resources.sounds.break))})),events.on("HERO_POSITION",this,(e=>{this.deselectTiles([e])}))}getIntersectingTile(e){return this._tileMap.get(e.round())}setWallTerrain(e){e.setTerrain({darkTerrain:this.darkWallTerrain,lightTerrain:this.lightWallTerrain})}setSandTerrain(e){e.setTerrain({darkTerrain:this.darkSandTerrain,lightTerrain:this.lightSandTerrain})}getTile=e=>this._tileMap.get(e.round());getTileByCoordinates(e,t,i){let r=Math.floor(t/this._tileSize),a=Math.floor(e/this._tileSize);return i&&(r+=Math.abs(i.getRow),a+=Math.abs(i.getCol)),this.getTile(new Vector2D(r,a))}initialize(e,t){const i=generateMaze(t,e);for(let r=0;r<t;r++)for(let t=0;t<e;t++){const a=r*e+t;let n={darkTerrain:this.darkSandTerrain,lightTerrain:this.lightSandTerrain};1===i[a]&&(n={darkTerrain:this.darkWallTerrain,lightTerrain:this.lightWallTerrain});const o=new Vector2D(r,t),s=new Tile(o,n);this._tileMap.add(o,s),this.addRandomCoin(s)}this.addRandomLights(e,t)}addRandomLights(e,t){for(let i=0;i<5;i++){let i=null,r=null;do{i=new Vector2D(Math.floor(Math.random()*t),Math.floor(Math.random()*e)),r=this._tileMap.get(i)}while(r.childrenCount>0||!r.terrain.getIsPassable());r.appendChild(new Light(i,75,75,this._lightAnimation))}}addRandomCoin(e){if(e.terrain.getIsPassable()){Math.random()<=.1&&e.appendChild(new Coin(e.position,40,50,this._coinAnimation))}}selectTiles(e){e.forEach((e=>{const t=this._tileMap.get(e);t&&!t.isSelected&&t.select()}))}deselectTiles(e){e.forEach((e=>{const t=this._tileMap.get(e);t&&t.isSelected&&t.deselect()}))}update(e){this._coinAnimation.update(e),this._lightAnimation.update(e),this._tileMap.forEach((t=>{t.update(e)}))}highLightTilesAround(e,t){const i=calculateLighting(this._tileMap,e,t);for(const e of i)e.displayMode=DisplayMode.LightMode}draw(e,t){t&&this.highLightTilesAround(t.position.round(),2),this._tileMap.forEach((t=>{t._children.some((e=>e instanceof Light))&&this.highLightTilesAround(t.position,1),t.draw(e),t.displayMode=DisplayMode.DarkMode}))}}