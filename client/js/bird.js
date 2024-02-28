function Bird() {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -10;
    this.velocity = 0;
    this.brain = new NeuralNetwork([5, 4, 3, 1])
    this.dead = false
    this.score = 0
    this.amIBest = false
    this.fill = [255]

    this.show = function () {
        if (this.amIBest) {
            this.fill = [0, 255, 0]
        } else {
            this.fill = [255]
        }
        fill(this.fill)
        ellipse(this.x, this.y, 32, 32);
    }

    this.up = function () {
        this.velocity += this.lift;
    }

    this.update = function () {
        this.score += 0.1

        if (this.y >= height || this.y <= 0) {
            this.dead = true
        }

        let input = []
        input[0] = this.y / width
        input[1] = pipes[record.i].x / height
        input[2] = pipes[record.i].bottom / width
        input[3] = pipes[record.i].top / width
        input[4] = this.velocity / 10

        let temp = this.brain.feedIn(input)
        if (temp[0] > 0.5) {
            this.up()
        }
        this.velocity += this.gravity;

        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}