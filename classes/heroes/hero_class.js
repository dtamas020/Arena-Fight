const hero_classes = require('../../hero_classes.json')
const spells = require('../../spells.json')
const Arena = require('../arena')

class Hero {
    // Used for indexing the heroes
    static count_of_heroes = 0;

    constructor(name) {
        this.name = name;
        this.effects = []
        Hero.count_of_heroes++;
        this.id = Hero.count_of_heroes;
    }

    init_stats(heroClass) {
        if (!hero_classes.hasOwnProperty(heroClass)) {
            console.error(`${heroClass} tipusú harcos nem lehetséges`)
            process.exit()
        }

        this.heroClass = heroClass
        this.HP = hero_classes[this.heroClass].HP
        this.Abilities = hero_classes[this.heroClass].Abilities
        this.Armour = hero_classes[this.heroClass].Armour
        this.Evasion = hero_classes[this.heroClass].Evasion
        this.DefaultDamage = hero_classes[this.heroClass].DefaultDamage
    }

    equipWeapon(weapon) {
        this.weapon = weapon
    }

    set_opponents(opponents) {
        this.opponents = opponents;
    }

    // An effect of spell (or item if exists) reached this Hero. 
    // If the spell is not instant (turns_until_active != 0), then we place this 
    // in the effects property with the current turn number to know, when will it expire
    effect_reached_target(effect) {
        this[effect.details.Property] += effect.details.Quantity
        if (effect.details.turns_until_active != 0)
            this.effects.push({ receivedInTurn: this.arena.numberOfTurns, ...effect })
    }

    // We check that if this hero has any expired spell, than it will be returned.
    clear_expired_spells() {
        let clearedSpells = this.effects.map((effect, index) => {
            if (effect.details.turnsUntilActive + effect.receivedInTurn <= this.arena.numberOfTurns) {
                this.effects.splice(index, 1)
                this[effect.details.Property] -= effect.details.Quantity

                return effect
            }
        })
        return clearedSpells
    }

    // This hero tries to activate one of its spells (random). 
    // if successful, then we return the spell and apply the effect in "effect_reached_target" method.
    try_to_activate_spell() {
        let spell = []
        if (does_any_spell_activates()) {
            let countOfPossibleSpells = this.Abilities.length
            let indexOfSpellToAdd = Math.floor(Math.random() * (countOfPossibleSpells))

            let spellNameOfCast = this.Abilities[indexOfSpellToAdd]
            let spellToCast = { name: spellNameOfCast, details: spells[spellNameOfCast] }

            let spellTarget = spellToCast.details.Target === "opponent" ? choose_opponent(this) : spellToCast.details.Target === "self" ? this : console.error("ismeretlen célpont!")

            spellTarget.effect_reached_target(spellToCast)

            spell.push(spellToCast)
        }
        return spell;
    }

    // This Hero tries to attack one random of its opponents.
    // If the attack is successful, then informations about the attack is returned
    attack_opponent_with_weapon() {
        let attack = { type: "not_wielder" }
        if (can_hero_use_its_weapon(this)) {
            let opponent = choose_opponent(this)

            if (!calculate_chance_for(opponent.Evasion)) {
                if (calculate_chance_for(this.weapon.Chance)) {
                    let weaponDamage = this.weapon.get_weapon_damage()
                    let reducer = Math.floor(opponent.Armour / 3)

                    let dealtDamage = this.DefaultDamage + (weaponDamage - reducer)

                    opponent.HP -= dealtDamage
                    attack = { type: "hit", damage: { hero_damage: weaponDamage + this.DefaultDamage, dealtDamage: dealtDamage, reducer: reducer }, opponent: opponent }
                }
                else {
                    attack = { type: "miss", opponent: opponent }
                }
            }
            else {
                attack = { type: "dodge", opponent: opponent }
            }
        }
        return attack
    }
}

module.exports = Hero

function does_any_spell_activates() {
    let chance = 10
    let randomNumber = Math.floor(Math.random() * 101)

    return chance > randomNumber
}

function choose_opponent(hero) {
    hero.opponents = hero.opponents.filter(opp => opp.HP > 0)
    let randomArrayIndex = Math.floor(Math.random() * hero.opponents.length)

    return hero.opponents[randomArrayIndex]
}

function can_hero_use_its_weapon(hero) {
    return hero.weapon.Wielders.includes(hero.heroClass)
}

function calculate_chance_for(attribute) {
    let chance = attribute
    let randomNumber = Math.floor(Math.random() * 101)

    return chance > randomNumber
}
