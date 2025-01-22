import { World } from "./src/World.js";
import { MainLoop } from "./MainLoop.js";
import { ObjectInputHandler } from "./src/input/ObjectInputHandler.js";
import { WorldInputHandler } from "./src/input/WorldInputHandler.js";
import { Vector2D } from "./src/Vector2D.js";
import { Sprite, CroppableSprite } from "./src/Sprite.js";
import { resources } from "./Resources.js";
import { GirlHero } from "./src/objects/GirlHero.js";
import { Camera } from "./Camera.js";
import { GnomeHero } from "./src/objects/GnomeHero.js";
import "./style.css";


const board = document.getElementById("board");

/*
board.width = window.innerWidth;
board.height = window.innerHeight;*/

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


const worldInputHandler = new WorldInputHandler(board);
const inputHandler = new ObjectInputHandler(board);

const camera  = new Camera();
const world = new World(camera, worldInputHandler, 32, 20);
world.generateMaze();

const hero = new GnomeHero(new Vector2D(1,2), inputHandler);
const enemy = new GirlHero(new Vector2D(1,5), inputHandler);
world.appendChild(hero);
world.appendChild(enemy);


const update = (delta) => {
    world.handleInputEvents();
    world.update(delta);
    hero.frame(delta);
    enemy.frame(delta);
};

const render = () => {
    world.draw(context);
};

new MainLoop(update, render).start();