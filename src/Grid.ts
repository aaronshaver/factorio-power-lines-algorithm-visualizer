import Pole from './Pole'

class Grid {
    poles: Pole[]
    size: number

    constructor() {
        this.size = 16
        this.poles = []
    }
}

export default Grid