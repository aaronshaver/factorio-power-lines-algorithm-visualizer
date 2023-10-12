import Pole from './Pole'

class Grid {
    private poles: Pole[]
    readonly size: number
    readonly squareSize: number
    readonly maxDistance: number

    constructor() {
        this.size = 18
        this.squareSize = 40
        this.maxDistance = 7
        this.poles = []
    }

    addPole(pole: Pole): boolean {
        for (let existing_pole of this.poles) {
            // prevent adding pole where one already exists
            if (existing_pole.x === pole.x && existing_pole.y === pole.y) {
                return false
            }
        }

        // connect Poles if applicable
        for (let existing_pole of this.poles) {
            // allow a maximum of five connections to other poles
            if (existing_pole.connections.length == 5) {
                continue
            }
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