# Neuroevolution: Flappy Bird - Legacy

A Flappy Bird clone, which uses neuroevolution to train agents. This project also includes an analysis page to monitor the neural-network of the best performing agent.

This project does not use any external neural-network libraries. I am the sole creator of the **simpleNN** library found under **client/libs**.

The Flappy Bird game engine code is adapted from the [Coding Challenge #31: Flappy Bird](https://www.youtube.com/watch?v=cXgA1d_E-jY).

Project inspired by [The Coding Train: Coding Challenge #100: Neuroevolution Flappy Bird](https://www.youtube.com/watch?v=c6y21FkaUqw).

## Usage

### 0. Install dependencies

```console
$ npm clean-install
```

### 1. Start the server

```console
$ npm run start
```

### 2. Open the analysis page: [localhost:8080/a](http://localhost:8080/a)

### 3. Open the client page: [localhost:8080/c](http://localhost:8080/c)

### 4. Spectate the learning process!

## Features: Analysis page

### Neural network

The neural network presented belongs to the best agent. The best agent is depicted as Green in the game page.

### Weights

The connection's **weight** is represented as the **thickens**, and the **sign (+/-)** as the **color** of the line between the neurons. Green for positive, and Red for negative ones.

By **pressing any key** You can **toggle the display of the numerical value** of the weights.

By **pressing `a` or `d`** You can **move the displayed value right or left** respectively.

## Features: Game

### Speed control

On the bottom right of the game window there is a slider that You can use to speed up the training process by increasing the game speed.

### Rendering

The game will get laggy after increasing the speed. You can **press any key** to **toggle rendering**, in order to speed up neuroevolution.

## Project Status

This is a legacy project of mine. I decided to publish it to share my story and inspire others. I do not plan to improve or modify it. No contributions will be accepted.

## History and Motivation

This section will be very personal, but I feel that without it the whole story would be incomplete.

This project was created in early 2019, the second semester of my 8th primary school grade, while I was 14 years old. I know that this code is a spaghetti, even I don't understand all of it, but taking into account my age at the time of writing it, I am proud of what I created: a neuroevolution algorithm without any neural-network libraries, in pure JS.

The commits that You see on github are myself trying to make this code runnable and preparing it for publication. No other changes to the original source were or will be made.

I decided to publish this project because I am proud of it. It shows that no matter Your age, with the right amount of curiosity You can achieve anything!

Thanks for sticking around, stay curious!
