class Pole {
    x: number
    y: number
    connections: Pole[] // count > 0 == connnected

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.connections = []
    }

}

export default Pole