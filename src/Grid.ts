import Pole from './Pole'

class Grid {
    private poles: Pole[]
    size: number
    squareSize: number
    maxDistance: number

    constructor() {
        this.size = 16
        this.squareSize = 40
        this.maxDistance = 4
        this.poles = []
    }

    addPole(pole: Pole): boolean {
        // check for existing Pole at proposed new Pole's location
        for (let existing_pole of this.poles) {
            if (existing_pole.x === pole.x && existing_pole.y === pole.y) {
                return false
            }
        }

        // connect Poles if applicable
        for (let existing_pole of this.poles) {
            const distance = Math.sqrt(Math.pow(existing_pole.x - pole.x, 2) + Math.pow(existing_pole.y - pole.y, 2));

            if (distance <= this.maxDistance) {
                existing_pole.connections.push(pole)
                pole.connections.push(existing_pole)
            }
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