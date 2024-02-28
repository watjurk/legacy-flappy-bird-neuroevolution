let birds = [];
let pipes = [];
let record;
let gen = 0;
let f1 = true;
let f2 = false;
let counter = 0;
let slider;
let order = [
  "Y coordinate of the bird",
  "X coordinate of the closes pipe",
  "bottom Y coordinate of the closes pipe opening",
  "top Y coordinate of the closes pipe opening",
  "Y velocity of the bird",
];

let socket = io.connect("http://localhost:8080");
socket.emit("c");

let bestEver = {
  s: 0,
};

class Game {
  constructor() {
    createCanvas(1040, 880);
    slider = createSlider(1, 200, 1);
    for (let i = 0; i < 400; i++) {
      birds.push(new Bird());
    }
    // console.log(birds)
  }

  update() {
    for (let n = 0; n < slider.value(); n++) {
      if (counter % 75 == 0) {
        pipes.push(new Pipe());
      }
      counter++;

      record = {
        dist: undefined,
        i: 0,
      };

      for (let i in pipes) {
        if (pipes[i].x - this.x > 0) {
          if (record.dist > pipes[i].x - this.x || record.dist == undefined) {
            record.dist = pipes[i].x - this.x;
            record.i = i;
          }
        }
      }

      for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();

        for (let j in birds) {
          if (pipes[record.i].hits(birds[j])) {
            birds[j].dead = true;
          }
        }

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }
      }
      let f3 = false;
      for (let i in birds) {
        if (!birds[i].dead && pipes.length > 0) {
          birds[i].update();
        }
        if (birds[i].score > bestEver.s && !f3 && gen > 0) {
          birds[i].amIBest = true;
          if (i != bestEver.i) {
            console.log("new Best ever!");
            const data = {
              w: birds[bestEver.i].brain.getW(),
              size: birds[bestEver.i].brain.getSize(),
              o: order,
            };
            socket.emit("upt", data);
          }
          bestEver.s = birds[i].score;
          bestEver.i = i;
          birds[i].amIBest = true;
          f2 = true;
          f3 = true;
        }
      }

      let allDead = true;
      for (let i in birds) {
        if (!birds[i].dead) {
          allDead = false;
        }
      }

      if (allDead) {
        if (!f2) {
          bestEver.i = birds.length - 1;
        }
        f2 = false;

        for (let i in birds) {
          birds[i].score = Math.pow(3, birds[i].score);
        }
        let scoreSum = 0;
        for (let i in birds) {
          scoreSum += birds[i].score;
        }
        for (let i in birds) {
          birds[i].fitness = birds[i].score / scoreSum;
        }

        function pickOne() {
          var index = 0;
          var r = random(1);

          while (r > 0) {
            r = r - birds[index].fitness;
            index++;
          }
          index--;
          return index;
        }
        let temp = [];

        for (let i = 0; i < birds.length - 1; i++) {
          const p1 = birds[pickOne()];
          const p2 = birds[pickOne()];
          const p1W = p1.brain.getW();
          const p2W = p2.brain.getW();
          const p1B = p1.brain.getB();
          const p2B = p2.brain.getB();
          temp.push(NeuralNetwork.getBabyFappyBird(p1W, p2W, p1B, p2B));
        }

        let tt = new Bird();
        tt.brain.applayW(birds[bestEver.i].brain.getW());
        tt.brain.applayB(birds[bestEver.i].brain.getB());
        tt.amIBest = true;
        temp.push(tt);

        birds = temp;

        pipes = [];
        gen++;
        console.log(gen);
      }
    }

    background(0);
    if (f1) {
      for (let i in birds) {
        if (!birds[i].dead) {
          birds[i].show();
        }
      }
      for (let i in pipes) {
        pipes[i].show();
      }
    }
    push();
    textSize(40);
    fill(0, 255, 0);
    text("gen: " + gen, 20, 50);
    pop();
  }

  keyPressed() {
    if (f1) {
      f1 = false;
    } else {
      f1 = true;
    }
  }
}

socket.on("disconnect", function () {
  setTimeout(() => {
    location.href = "/c";
  }, 4000);
});
