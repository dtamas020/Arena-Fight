const weapons = require('../../weapons.json')

class Weapon {
    init_stats(weapon) {
        if (!weapons.hasOwnProperty(weapon)) {
            console.log(`${weapon} tipusú fegyver nem lehetséges`)
            process.exit()
        }

        this.type = weapon
        this.Damage = weapons[weapon].Damage
        this.Chance = weapons[weapon].Chance
        this.Wielders = weapons[weapon].Wielders
    }

    get_weapon_damage() {
        let difference = this.Damage.max - this.Damage.min
        return Math.floor((Math.random() * (difference + 1))) + this.Damage.min
    }
}

module.exports = Weapon