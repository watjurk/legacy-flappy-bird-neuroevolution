function Pipe() {
  this.spacing = 70;
  this.top = random(height / 6, 3 / 4 * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 6;
  this.fill = [0, 0, 255]

  this.hits = function (bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  this.show = function () {
    fill(255);

    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    push()
    fill(this.fill)
    pop()
  }

  this.update = function () {
    this.x -= this.speed;
  }

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}