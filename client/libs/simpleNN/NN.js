// MIT License
// Copyright (c) 2019-present, Wiktor Jurkiewicz

class NeuralNetwork {
    constructor(cf, err) {

        class Ineuron {
            constructor(sendTo, inMyLayer) {
                this.inMyLayer = inMyLayer
                this.sendTo = sendTo
                this.data = []
                this.ReciFrom = 0
                this.weights = []
                this.bias = (Math.random() * 2 - 1)

                for (let i = 0; i < this.sendTo.length; i++) {
                    this.weights[i] = (Math.random() * 2 - 1)
                    // this.weights[i] = 2
                }
            }

            dataIO() {

                let inp = 0
                for (let i in this.data) {
                    inp += this.data[i]
                }

                for (let i in this.sendTo) {
                    let OptData = inp * this.weights[i] + this.bias

                    nn.layers[this.sendTo[i]].data.push(OptData)
                    nn.layers[this.sendTo[i]].ReciFrom++
                    if (nn.layers[this.sendTo[i]].ReciFrom == this.inMyLayer) {
                        nn.layers[this.sendTo[i]].dataIO()
                        nn.layers[this.sendTo[i]].ReciFrom = 0
                    }
                }

                this.data = []
            }
        }

        class Hneuron {
            constructor(sendTo, inMyLayer) {
                this.inMyLayer = inMyLayer
                this.sendTo = sendTo
                this.data = []
                this.ReciFrom = 0
                this.weights = []
                this.bias = (Math.random() * 2 - 1)

                for (let i = 0; i < this.sendTo.length; i++) {
                    this.weights[i] = (Math.random() * 2 - 1)
                    // this.weights[i] = 2
                }
            }

            dataIO() {

                let inp = 0
                for (let i in this.data) {
                    inp += this.data[i]
                }

                inp += this.bias
                for (let i in this.sendTo) {
                    let OptData = (1 / (1 + Math.exp(-inp))) * this.weights[i]

                    nn.layers[this.sendTo[i]].data.push(OptData)
                    nn.layers[this.sendTo[i]].ReciFrom++
                    if (nn.layers[this.sendTo[i]].ReciFrom == this.inMyLayer) {
                        nn.layers[this.sendTo[i]].dataIO()
                        nn.layers[this.sendTo[i]].ReciFrom = 0
                    }
                }

                this.data = []
            }
        }

        class Oneuron {
            constructor(inMyLayer) {
                this.inMyLayer = inMyLayer
                this.data = []
                this.ReciFrom = 0
                this.weights = []

            }

            dataIO() {

                let inp = 0
                for (let i in this.data) {
                    inp += this.data[i]
                }
                const OptData = (1 / (1 + Math.exp(-inp)))
                nn.Opt.push(OptData)
                this.data = []
            }
        }

        class Nn {
            constructor(cf, err) {
                this.err = false
                if (!Array.isArray(cf)) {
                    console.error('Error NeuralNetwork Constructor needs arr')
                    this.err = true
                }
                if (err != undefined) {
                    console.error('Error NeuralNetwork Constructor needs one argument in arr')
                    this.err = true
                }
                if (Array.isArray(cf) && cf.length < 2) {
                    console.error('Error NeuralNetwork Constructor needs min 2 nums in arr like so: [2,2]')
                    this.err = true
                }

                if (!this.err) {
                    this.layersN = cf.slice()
                    this.layers = []

                    this.inputSN = cf[0]
                    this.outputSN = cf[cf.length - 1]
                    cf.splice(cf.length - 1, 1)
                    cf.splice(0, 1)
                    this.hiddenN = cf

                    this.Opt = []

                    for (let i = 0; i < this.outputSN; i++) {
                        this.layers.push(new Oneuron(this.outputSN))
                    }
                    let l = 0
                    for (let i = this.hiddenN.length - 1; i >= 0; i--) {
                        let SendTo = []
                        let k = 0
                        for (let j = this.layers.length - 1; k < this.layersN[this.layersN.length - 1 - l]; j--) {
                            k++
                            SendTo.push(j)
                        }

                        for (let j = 0; j < this.hiddenN[i]; j++) {
                            this.layers.push(new Hneuron(SendTo, this.hiddenN[i]))
                        }
                        l++
                    }
                    let SendTo = []
                    let j = 0
                    for (let i = this.layers.length - 1; j < this.layersN[1]; i--) {
                        j++
                        SendTo.push(i)
                    }
                    for (let i = 0; i < this.inputSN; i++) {
                        this.layers.push(new Ineuron(SendTo, this.inputSN))
                    }
                }
            }

            feedIn(data) {
                this.Opt = []
                if (data != undefined && data.length == this.inputSN) {
                    let j = 0
                    for (let i = this.layers.length - 1; j < this.inputSN; i--) {
                        this.layers[i].data.push(data[j])
                        j++
                    }
                    let k = 0
                    for (let i = this.layers.length - 1; k < this.inputSN; i--) {
                        this.layers[i].dataIO()
                        k++
                    }
                    return this.Opt
                } else {
                    console.error("Error: Size of your data is other than num of input nodes and it nedds to be an array")
                }
            }
        }

        let nn = new Nn(cf, err)
        this.feedIn = function (data) {
            return nn.feedIn(data)
        }
        this.print = function () {
            console.log(nn)
        }
        // this.up = function () {
        //     this.w = []
        //     this.outputSN = nn.outputSN
        //     for (let i in nn.layers) {
        //         this.w.push(nn.layers[i].weights)
        //     }
        // }

        this.getSize = function () {
            return nn.layersN
        }

        this.applayW = function (W) {
            let k = 0
            for (let i = nn.outputSN; i < nn.layers.length; i++) {
                nn.layers[i].weights = []
                for (let j = 0; j < nn.layers[i].sendTo.length; j++) {
                    nn.layers[i].weights.push(W[j + k])
                }
                k += nn.layers[i].sendTo.length
            }
        }

        this.getW = function () {
            let arr = []
            let w = []
            for (let i in nn.layers) {
                w.push(nn.layers[i].weights)
            }
            for (let i = nn.outputSN; i < w.length; i++) {
                if (w[i].length > 0) {
                    for (let j in w[i]) {
                        arr.push(w[i][j])
                    }
                } else {
                    arr.push(null)
                }
            }
            return arr
        }

        this.getB = function () {
            let b = []
            for (let i in nn.layers) {
                if (nn.layers[i].bias != undefined) {
                    b.push(nn.layers[i].bias)
                }
            }
            return b
        }

        this.applayB = function (B) {
            let j = 0
            for (let i in nn.layers) {
                if (nn.layers[i].bias != undefined) {
                    nn.layers[i].bias = B[j]
                    j++
                }
            }
        }

        this.MaP = function (n, start1, stop1, start2, stop2, withinBounds) {
            let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
            if (!withinBounds) {
                return newval;
            }
            if (start2 < stop2) {
                return constrain(newval, start2, stop2);
            } else {
                return constrain(newval, stop2, start2);
            }

            function constrain(n, low, high) {
                return Math.max(Math.min(n, high), low);
            }
        }
    }
    static getBabyDotsGame(p1W, p2W) {
        let bW = []
        if (p2W != undefined) {
            let rs = Math.round(random(10, p1W.length - 10))
            for (let i = 0; i < rs; i++) {
                bW.push(p1W[i])
            }
            for (let i = rs; i < p1W.length; i++) {
                bW.push(p2W[i])
            }

            for (let i in bW) {
                if (random(0, 1) < 0.2) { // 0.2 ==  mutation rate
                    bW[i] = Math.random() * 2 - 1
                }
            }
        } else {
            bW = p1W
        }
        let baby = new player(random(w - 100, 100), random(h - 100, 100))
        baby.brain.applayW(bW)
        return baby
    }

    static getBabyFappyBird(p1W, p2W, p1B, p2B) {

        let bW = []
        let bB = []

        let rs = Math.round(random(p1W.length))
        for (let i = 0; i < rs; i++) {
            bW.push(p1W[i])
        }
        for (let i = rs; i < p1W.length; i++) {
            bW.push(p2W[i])
        }

        rs = Math.round(random(p1B.length))
        for (let i = 0; i < rs; i++) {
            bB.push(p1B[i])
        }
        for (let i = rs; i < p1B.length; i++) {
            bB.push(p2B[i])
        }


        for (let i in bW) {
            if (random(0, 1) < 0.1) { // 0.1 ==  mutation rate
                bW[i] = (Math.random() * 2 - 1)
            }
        }

        for (let i in bB) {
            if (random(0, 1) < 0.1) { // 0.1 ==  mutation rate
                bB[i] = (Math.random() * 2 - 1)
            }
        }

        let baby = new Bird()
        baby.brain.applayW(bW)
        baby.brain.applayB(bB)
        return baby
    }
}