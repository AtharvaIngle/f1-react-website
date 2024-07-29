import React, { useEffect } from 'react';
import './Game.css';
import p5 from 'p5';

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
  let road;
  let obstacles = [];
  let frameCount = 0;

  p.setup = () => {
    p.createCanvas(800, 600).parent('gameCanvas');
    road = new Road(p);
    car = new Car(p);

    // Create some obstacles
    for (let i = 0; i < 5; i++) {
      obstacles.push(new Obstacle(p));
    }
  };

  p.draw = () => {
    p.background(200, 220, 255); // Sky blue background
    road.show();
    car.update();
    car.show();
    car.checkEdges();
    
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

    // Update the score and frame count
    frameCount++;
    if (frameCount % 60 === 0) { // Every second
      car.score++;
    }
    p.fill(0);
    p.textSize(24);
    p.text(`Score: ${car.score}`, 10, 30);
  };

  class Road {
    constructor(p) {
      this.p = p;
      this.color = 'white';
    }

    show() {
      this.p.fill(this.color);
      this.p.rect(0, 0, this.p.width, this.p.height);
    }
  }

  class Car {
    constructor(p) {
      this.p = p;
      this.x = this.p.width / 2;
      this.y = this.p.height - 60;
      this.size = 50;
      this.speed = 5;
      this.score = 0;
    }

    update() {
      if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
        this.x -= this.speed;
      }
      if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
        this.x += this.speed;
      }
      this.x = this.p.constrain(this.x, 0, this.p.width - this.size);
    }

    show() {
      this.p.fill('red');
      this.p.rect(this.x, this.y, this.size, this.size);
    }

    checkEdges() {
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > this.p.width - this.size) {
        this.x = this.p.width - this.size;
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
    constructor(p) {
      this.p = p;
      this.x = p.random(p.width);
      this.y = p.random(-500, -50);
      this.size = 50;
      this.speed = p.random(2, 5);
    }

    update() {
      this.y += this.speed;
      if (this.y > p.height) {
        this.y = p.random(-500, -50);
        this.x = p.random(p.width);
      }
    }

    show() {
      this.p.fill('black');
      this.p.rect(this.x, this.y, this.size, this.size);
    }
  }
};

export default Game;
