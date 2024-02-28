let socket = io.connect('http://localhost:2000')
socket.emit('a')
let f1 = false
let dd
let WTmove = 0

function setup() {
    createCanvas(2000, 2000)
    background(0)
    socket.on('opt', (data) => {
        dd = data
        update(dd)
    })
}

function keyPressed() {
    if (!keyIsDown(68) && !keyIsDown(65)) {
        if (f1) {
            f1 = false;
        } else {
            f1 = true;
        }
    } else {
        if (keyIsDown(65)) {
            WTmove += 5
        }
        if (keyIsDown(68)) {
            WTmove -= 5
        }
    }
    update(dd)
}



function update(data) {
    background(0)
    let Warr = []
    Warr = reversArr(data.w.slice(), data.size)
    let lastPoz = []
    for (let i in data.size) {
        let x = (width / 5) + (((width - 2 * (width / 5)) / data.size.length) * (Number(i) - 1)) + width/4
        let y
        for (let j = 1; j <= data.size[i]; j++) {
            let temp = (height - 2 * (height / 3.5)) / data.size[i]
            y = (height / 5) + (temp * (j - 1)) + (temp / 2)
            lastPoz.push(createVector(x, y))
        }
    }


    let m = Warr.length - 1

    for (let i = 0; i < data.size[0]; i++) {
        let x1 = lastPoz[i].x
        let y1 = lastPoz[i].y
        for (let j = 0; j < data.size[1]; j++) {
            let x2 = lastPoz[data.size[0] + j].x
            let y2 = lastPoz[data.size[0] + j].y
            drawLine(x1, y1, x2, y2, m)
            m--
        }
    }

    let l = data.size[0]
    for (let i = 1; i < data.size.length; i++) {
        l += data.size[i]
        for (let j = 0; j < data.size[i]; j++) {
            let x1 = lastPoz[j + l - data.size[i]].x
            let y1 = lastPoz[j + l - data.size[i]].y
            for (let k = 0; k < data.size[i + 1]; k++) {
                let x2 = lastPoz[k + l].x
                let y2 = lastPoz[k + l].y
                drawLine(x1, y1, x2, y2, m)
                m--
            }
        }
    }
    let j = 0
    for (let i in lastPoz) {
        noStroke()
        ellipse(lastPoz[i].x, lastPoz[i].y, 40, 40)
        if (j < data.o.length) {
            push()
            textSize(20)
            textAlign(CENTER, CENTER)
            fill(0, 255, 0)
            text(data.o[j], lastPoz[i].x - ((data.o[j].length * 5.2)+10), lastPoz[i].y)
            pop()
        }
        if(lastPoz[Number(i)+1] == undefined) {
            push()
            textSize(20)
            textAlign(CENTER, CENTER)
            fill(0, 255, 0)
            text('output', lastPoz[i].x + 100, lastPoz[i].y)
            pop()
        }
        j++
    }

    function drawLine(x1, y1, x2, y2, m) {
        push()
        if (Warr[m] > 0) {
            stroke(0, 255, 0)
        } else {
            stroke(255, 0, 0)
        }
        strokeWeight(Math.abs(Warr[m] * 3))
        line(x1, y1, x2, y2)
        if (f1) {

            textSize(10)
            textAlign(CENTER, CENTER)
            fill(0, 255, 0)


            let a = Math.abs(x1 - x2)
            let b = Math.abs(y1 - y2)

            translate((x1 + x2) / 2, ((y1 + y2) / 2))

            let c = Math.sqrt(a * a + b * b);
            let alfa = Math.asin(a / c) * 180 / Math.PI;
            let beta = Math.asin(b / c) * 180 / Math.PI;

            if (y2 >= y1) {
                rotate(radians(beta))
            } else {
                rotate(radians(alfa + 270))
            }
            noStroke()
            text(Warr[m], WTmove, -10)
            pop()
        }
    }

    function reversArr(arr, size) {
        let reveredArr = []
        let temp = arr.splice(-(size[0] * size[1]))
        for (let i in temp) {
            reveredArr.push(temp[i])
        }
        for (let k = 1; k < size.length - 1; k++) {
            let tempArr = arr.splice(-(size[k] * size[k + 1]))
            if (k % 2 != 0) {
                for (let j in tempArr) {
                    reveredArr.unshift(tempArr[j])
                }
            } else {
                for (let i = tempArr.length - 1; i >= 0; i--) {
                    reveredArr.unshift(tempArr[i])
                }
            }
        }
        return reveredArr
    }
}

socket.on('disconnect', function () {
    setTimeout(() => {
        location.href = '/a'
    }, 4000);
})