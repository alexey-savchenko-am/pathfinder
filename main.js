import { World } from "./src/World.js";
import { MainLoop } from "./MainLoop.js";
import { Hero } from "./src/Hero.js";
import { ObjectInputHandler } from "./src/input/ObjectInputHandler.js";
import { WorldInputHandler } from "./src/input/WorldInputHandler.js";
import { Vector2D } from "./src/Vector2D.js";
import { Sprite, CroppableSprite } from "./src/Sprite.js";
import { resources } from "./Resources.js";
import { GirlHero } from "./src/Heroes.js";



const board = document.getElementById("board");
const context = board.getContext("2d");
const coords = document.getElementsByClassName("coords")[0];
context.imageSmoothingEnabled = false;


board.addEventListener("mousemove", (e) => {

    let canvasPosition = board.getBoundingClientRect();
    const xPos = Math.floor(e.x - canvasPosition.left);
    const yPos = Math.floor(e.y - canvasPosition.top);

    coords.innerText = `${xPos};${yPos}`;
});

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

//800X600  (8X6)
const worldInputHandler = new WorldInputHandler(board);
const inputHandler = new ObjectInputHandler(board);
const world = new World(worldInputHandler, 12, 10);

const hero = new GirlHero(new Vector2D(1,2));
//const coin = new Coin(new Vector2D(5,5));
world.appendChild(hero);
//world.appendChild(coin);

world.generateTerrain();

const update = (delta) => {
    //console.log(delta);
    world.handleInputEvents();
    world.update(delta);
    hero.frame(delta);
    //coin.frame(delta);
};

const render = () => {
    context.clearRect(0, 0, board.width, board.height);
    world.draw(context);
};

new MainLoop(update, render).start();