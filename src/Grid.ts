import Pole from './Pole'

class Grid {
    private poles: Pole[]
    size: number
    squareSize: number

    constructor() {
        this.size = 16
        this.squareSize = 40
        this.poles = []
    }

    addPole(pole: Pole): boolean {
        // check for existing Pole at proposed new Pole's location
        for (let existing_pole of this.poles) {
            if (existing_pole.x === pole.x && existing_pole.y === pole.y) {
                return false
            }
        }

        // connect Poles
        for (let existing_pole of this.poles) {
            existing_pole.connections.push(pole)
            pole.connections.push(existing_pole)
        }

        // add new Pole to Grid
        this.poles.push(pole)
        return true
    }

    getPoles() {
        return this.poles
    }

    clearPoles() {
        this.poles = []
    }
}

export default Grid