import Pole from './Pole'

class Grid {
    private poles: Pole[]
    readonly squareSize: number
    readonly MAX_CONNECTIONS: number
    readonly MAX_DISTANCE: number
    readonly GRID_SIZE: number
    readonly algorithm: string

    constructor(MAX_CONNECTIONS: number, MAX_DISTANCE: number, algorithm: string = "Maximal") {
        this.MAX_CONNECTIONS = MAX_CONNECTIONS
        this.MAX_DISTANCE = MAX_DISTANCE
        this.squareSize = 40
        this.GRID_SIZE = 18
        this.poles = []
        this.algorithm = algorithm
    }

    addPole(pole: Pole): boolean {
        for (let existing_pole of this.poles) {
            // prevent adding pole where one already exists
            if (existing_pole.x === pole.x && existing_pole.y === pole.y) {
                return false
            }
        }

        this.connectPoles(pole)
        if (pole.connections.length === 0) {
            // if our new pole still isn't connect, try again by relaxing the diagonals restriction
            this.connectPoles(pole, true)
        }

        // add new Pole to Grid
        this.poles.push(pole)
        return true
    }

    private connectPoles(pole: Pole, overrideDiagonalCheck: boolean = false) {
        for (let existing_pole of this.poles) {
            // skip if a target Pole already has the maximum number of connections
            if (existing_pole.connections.length == this.MAX_CONNECTIONS) {
                continue
            }

            if (this.algorithm == "Minimal" || this.algorithm == "Minimal (avoid diagonals)") {
                if (pole.connections.length > 0) {
                    break
                }
            }

            if (overrideDiagonalCheck === false) {
                if (this.algorithm == "Maximal (avoid diagonals)" || this.algorithm == "Minimal (avoid diagonals)") {
                    if (existing_pole.x != pole.x && existing_pole.y != pole.y) {
                        continue
                    }
                }
            }

            // enforce the maximum distance; don't connect if too far
            const distance = Math.sqrt(Math.pow(existing_pole.x - pole.x, 2) + Math.pow(existing_pole.y - pole.y, 2))
            if (distance <= this.MAX_DISTANCE) {
                existing_pole.connections.push(pole)
                pole.connections.push(existing_pole)
            }
        }
    }

    getPoles() {
        return this.poles
    }

    clearPoles() {
        this.poles = []
    }
}

export default Grid