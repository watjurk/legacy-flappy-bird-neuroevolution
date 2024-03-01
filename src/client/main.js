let game

function setup() {
    game = new Game()
}

function draw() {
    game.update()
}
function keyPressed() { 
    game.keyPressed()
}


// function keyPressed() {
//     if (key == ' ') {
//         game.keyPressed()
//     }
// }