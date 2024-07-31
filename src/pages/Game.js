import React, { useEffect } from 'react';
import './Game.css';
import p5 from 'p5';
import carImagePath from './f1_car.png'; // Ensure this path is correct
import obstacle1ImagePath from './obstacle1.png'; // Ensure this path is correct
import obstacle2ImagePath from './obstacle2.png'; // Ensure this path is correct

const Game = () => {
  useEffect(() => {
    new p5(sketch);
  }, []);

  return (
    <div className="game-container">
      <h1 className="game-title">F1 Racing Game</h1>
      <div id="gameCanvas" className="game-canvas"></div>
    </div>
  );
};

// p5.js sketch function
const sketch = (p) => {
  let car;
  let obstacles = [];
  let carImage;
  let obstacle1Image;
  let obstacle2Image;
  let frameCount = 0; // Initialize frameCount
  let score = 0; // Initialize score

  p.preload = () => {
    carImage = p.loadImage(carImagePath);
    obstacle1Image = p.loadImage(obstacle1ImagePath);
    obstacle2Image = p.loadImage(obstacle2ImagePath);
  };

  p.setup = () => {
    p.createCanvas(800, 600).parent('gameCanvas');
    car = new Car(p, carImage);

    // Create some obstacles with different types
    for (let i = 0; i < 5; i++) {
      let obstacleType = p.random() > 0.5 ? obstacle1Image : obstacle2Image;
      obstacles.push(new Obstacle(p, obstacleType));
    }
  };

  p.draw = () => {
    // Draw the beach background
    drawBeachBackground(p);

    // Update frame count and score
    frameCount++;
    if (frameCount % 60 === 0) { // Every second
      score++;
    }

    // Draw and move obstacles
    for (let obstacle of obstacles) {
      obstacle.update();
      obstacle.show();
      if (car.hits(obstacle)) {
        p.noLoop(); // Stop the game on collision
        p.textSize(32);
        p.fill(255, 0, 0);
        p.text('Game Over', p.width / 2 - 80, p.height / 2);
      }
    }

    car.update();
    car.show();
    car.checkEdges();

    // Update the score display
    p.fill(0);
    p.textSize(24);
    p.text(`Score: ${score}`, 10, 30);
  };

  const drawBeachBackground = (p) => {
    // Sky
    p.background(135, 206, 235); // Light blue sky
    // Sand
    p.fill(238, 214, 175); // Sandy beach color
    p.noStroke();
    p.rect(0, 0, p.width, p.height); // Cover the entire canvas with the sandy color
  };

  class Car {
    constructor(p, img) {
      this.p = p;
      this.x = this.p.width / 2;
      this.y = this.p.height - 100;
      this.size = 50;
      this.speed = 5;
      this.img = img;
    }

    update() {
      if (this.p.keyIsDown(this.p.LEFT_ARROW) || this.p.keyIsDown(65)) {
        this.x -= this.speed;
      }
      if (this.p.keyIsDown(this.p.RIGHT_ARROW) || this.p.keyIsDown(68)) {
        this.x += this.speed;
      }
      if (this.p.keyIsDown(this.p.UP_ARROW) || this.p.keyIsDown(87)) {
        this.y -= this.speed;
      }
      if (this.p.keyIsDown(this.p.DOWN_ARROW) || this.p.keyIsDown(83)) {
        this.y += this.speed;
      }
      this.x = this.p.constrain(this.x, 0, this.p.width - this.size);
      this.y = this.p.constrain(this.y, 0, this.p.height - this.size);
    }

    show() {
      if (this.img) {
        this.p.image(this.img, this.x, this.y, this.size, this.size);
      } else {
        this.p.fill('red');
        this.p.rect(this.x, this.y, this.size, this.size);
      }
    }

    checkEdges() {
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > this.p.width - this.size) {
        this.x = this.p.width - this.size;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y > this.p.height - this.size) {
        this.y = this.p.height - this.size;
      }
    }

    hits(obstacle) {
      return (
        this.x < obstacle.x + obstacle.size &&
        this.x + this.size > obstacle.x &&
        this.y < obstacle.y + obstacle.size &&
        this.y + this.size > obstacle.y
      );
    }
  }

  class Obstacle {
    constructor(p, img) {
      this.p = p;
      this.x = p.random(p.width);
      this.y = p.random(-500, -50);
      this.size = 50;
      this.speed = p.random(2, 5);
      this.img = img;
    }

    update() {
      this.y += this.speed;
      if (this.y > p.height) {
        this.y = p.random(-500, -50);
        this.x = p.random(p.width);
      }
    }

    show() {
      if (this.img) {
        this.p.image(this.img, this.x, this.y, this.size, this.size);
      } else {
        this.p.fill('black');
        this.p.rect(this.x, this.y, this.size, this.size);
      }
    }
  }
};

export default Game;
