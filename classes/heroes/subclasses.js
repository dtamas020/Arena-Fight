const Hero = require('./hero_class')

class Warrior extends Hero {
    constructor(name) {
        super(name);
        this.init_stats("Warrior")
    }
}

class Mage extends Hero {
    constructor(name) {
        super(name);
        this.init_stats("Mage")
    }
}

class Priest extends Hero {
    constructor(name) {
        super(name);
        this.init_stats("Priest")
    }
}

class Rouge extends Hero {
    constructor(name) {
        super(name);
        this.init_stats("Rouge")
    }
}

class Archer extends Hero {
    constructor(name) {
        super(name);
        this.init_stats("Archer")
    }
}
module.exports = { Warrior, Mage, Priest, Rouge, Archer }
