# Neuroevolution: Flappy Bird - Legacy

A Flappy Bird clone, which uses neuroevolution to train agents. This project also includes an analysis page to monitor the neural-network of the best performing agent.

This project does not use any external neural-network libraries. I am the sole creator of the **simpleNN** library found under **client/libs**.

The Flappy Bird game engine code is adapted from the [Coding Challenge #31: Flappy Bird](https://www.youtube.com/watch?v=cXgA1d_E-jY).

Inspired by [The Coding Train: Coding Challenge #100: Neuroevolution Flappy Bird](https://www.youtube.com/watch?v=c6y21FkaUqw).

## Usage

### 0. Install dependencies

```console
$ npm install
```

### 1. Start the server

```console
$ node ./server.js
```

### 2. Open the analysis page: [localhost:8080/a](http://localhost:8080/a)

### 3. Open the client page: [localhost:8080/c](http://localhost:8080/c)

### 4. Spectate the learning process!

## Features - Analysis page

### Neural network

The neural network presented belongs to the best agent. The best agent is depicted as Green in the game page.

### Weights

The connection's **weight** is represented as the **thickens**, and the **sign (+/-)** as the **color** of the line between the neurons. Green for positive, and Red for negative ones.

By **pressing any key** You can **toggle the display of the numerical value** of the weights.

By **pressing `a` or `d`** You can **move the displayed value right or left** respectively.

## Features - Game

### Speed control

On the bottom right of the game window there is a slider that You can use to speed up the training process by increasing the game speed.

### Rendering

The game will get laggy after increasing the speed. You can **press any key** to **toggle rendering**, in order to speed up neuroevolution.

## History

-- TODO --

## Status

This is a legacy project of mine. I decided to publish it to share my story and inspire others. I do not plan to improve or modify it. No contributions will be accepted.

Thanks for sticking around, stay curious!
