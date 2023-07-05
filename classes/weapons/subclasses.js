const Weapon = require('./weapon_class')

class Sword extends Weapon {
    constructor() {
        super()
        this.init_stats("Sword")
    }
}

class Dagger extends Weapon {
    constructor() {
        super()
        this.init_stats("Dagger")
    }
}

class WarHammer extends Weapon {
    constructor() {
        super()
        this.init_stats("WarHammer")
    }
}

class BattleAxe extends Weapon {
    constructor() {
        super()
        this.init_stats("BattleAxe")
    }
}

class Bow extends Weapon {
    constructor() {
        super()
        this.init_stats("Bow")
    }
}

class Wand extends Weapon {
    constructor() {
        super()
        this.init_stats("Wand")
    }
}

module.exports= { Sword, Dagger, WarHammer, BattleAxe, Bow, Wand}