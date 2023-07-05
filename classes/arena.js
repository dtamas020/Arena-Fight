class Arena {
    static number_of_turn = 0;

    static tournament(fighters) {

        // Condition for AllForOne style battle. If any of the heroes die, 
        // we remove it from fighters array and we log it to console.
        function condition_while_more_then_1_alive() {
            fighters = fighters.filter(hero => {
                if (hero.HP > 0)
                    return hero
                else
                    console.log(`\n${hero.name} died. \n`)
            })

            return fighters.length != 1
        }

        // heroes: array of Hero objects
        // With this method we can pick 1 random object and return it.
        function choose_a_random_hero_for_action(heroes) {
            let randomArrayIndex = Math.floor(Math.random() * heroes.length)
            let hero = heroes[randomArrayIndex]
            heroes.splice(randomArrayIndex, 1)

            return hero
        }

        // We check every Fighter's active spells.
        // If a spell is expired, then we remove it and revert the change of property
        // that was coused by the spell
        // If we remove an expired spell, it is listed in console.
        // If there were 0 expired spells, then "Nothing happened" will be logged to console.        
        function phase_clear_expired_spells() {
            let heroes = [...fighters]
            console.log('Phase: Spell check')
            let events = []

            while (heroes.length != 0 && condition_while_more_then_1_alive()) {
                let hero = choose_a_random_hero_for_action(heroes)
                let clearedSpells = hero.clear_expired_spells()
                if (clearedSpells.length != 0)
                    clearedSpells.forEach(spell => {
                        events.push({ hero: hero, spell: spell })
                    });
            }

            if (events.length != 0) {
                events.forEach(event => {
                    console.log(`\t${event.hero.name}'s ${event.spell.name} expired.`)
                });
            }
            else {
                console.log("\tNothing happened")
            }

            console.log('\n\n')
        }

        // Every fighter tries to attack one of its (random choosed) opponent.
        // 3 different types can be:
        //  dodge: The hero's opponent dodged the attack. It is logged to console.
        //  miss: The hero missed the attack. It is logged to console.
        //  hit: The hero lend a hit on the opponent.
        //      It is logged to console with the dealt original damage and the calculation [- original damage(amount reduced by the armor of opponent)].
        function phase_attack_with_weapon() {
            let heroes = [...fighters]
            console.log('Phase: Fight with weapons')

            while (heroes.length != 0 && condition_while_more_then_1_alive()) {
                let hero = choose_a_random_hero_for_action(heroes)
                let attack = hero.attack_opponent_with_weapon()
                switch (attack.type) {
                    case "dodge":
                        console.log(`\t${hero.name}'s attack was dodged by ${attack.opponent.name}`)
                        break;

                    case "miss":
                        console.log(`\t${hero.name} missed the attack on ${attack.opponent.name}!`)
                        break;

                    case "not_wielder":
                        console.log(`\t${hero.name} can not use its weapon!`)
                        break;

                    case "hit":
                        // console.log("🚀 ~ file: arena.js:72 ~ Arena ~ phase_attack_with_weapon ~ attack:", attack)

                        console.log(`\t${hero.name} dealt ${attack.damage.dealtDamage} damage to ${attack.opponent.name} -  ${attack.damage.hero_damage}(-${attack.damage.reducer})`)
                        // console.log(`\t${hero.name} dealt ${attack.damage.total_damage} damage to ${attack.opponent.name} - ${attack.damage.weapon_damage}(-${attack.damage.weapon_damage - attack.damage.total_damage}) `)
                        break;

                    default:
                        break;
                }
            }
            console.log('\n\n')
        }

        // Every fighter tries to use its own ability. 
        // The successful spell cast are listed in console.
        // If nobody could use spell, then "Nothing happened" will be logged to console.
        function phase_try_to_activate_spell() {
            let heroes = [...fighters]
            console.log('Phase: Try to activate spells')
            let events = []

            while (heroes.length != 0 && condition_while_more_then_1_alive()) {
                let hero = choose_a_random_hero_for_action(heroes)
                let activatedSpells = hero.try_to_activate_spell()

                if (activatedSpells.length != 0)
                    activatedSpells.forEach(spell => {
                        events.push({ hero: hero, spell: spell })
                    });
            }

            if (events.length != 0) {
                events.forEach(event => {
                    console.log(`\t${event.hero.name} casted ${event.spell.name}, ${event.spell.details.Property}: ${event.hero[event.spell.details.Property] - event.spell.details.Quantity} -> ${event.hero[event.spell.details.Property]}`)
                });
            }
            else {
                console.log("\tNothing happened")
            }

            console.log('\n\n')
        }

        // Set opponents for every Fighters in AllForOne style
        function set_opponents() {
            fighters.forEach(hero => {
                let opponents = fighters.filter(opponent => opponent.id != hero.id)
                hero.opponents = opponents
                hero.set_opponents(opponents)
            });
        }

        // Details of Heroes. It can be called any time
        // This method rearranges console.table to a vertical style.
        // One column, One Hero
        function current_details_of_fighters() {
            let details = {}
            let labels = { "Name": "name", "Class": "heroClass", "HP": "HP", "Armour": "Armour", "Evasion": "Evasion", "Character Damage": "Damage" }

            Object.keys(labels).forEach(label => {
                let subobj = {}
                fighters.forEach(hero => {
                    subobj[hero.id] = hero[labels[label]]
                });

                details[label] = subobj

            });
            
            let subobj = {}

            fighters.forEach(hero => {
                subobj[hero.id] = `${hero.weapon.Damage.min} - ${hero.weapon.Damage.max}`
            });

            details["Weapon Damage"] = subobj

            console.table(details)
        }

        // Beginning Of Combat

        set_opponents()

        do {

            Arena.number_of_turn++;
            console.log(`\n\n\n\n*********************** Turn ${Arena.number_of_turn}  ***********************\n\n\n\n`)

            phase_clear_expired_spells()

            phase_try_to_activate_spell()

            console.log('Warriors at the beggining of the turn')
            current_details_of_fighters()
            console.log('\n\n')


            phase_attack_with_weapon()

            console.log('Warriors at the end of the turn')
            current_details_of_fighters()

        } while (condition_while_more_then_1_alive());

    }

}

module.exports = Arena


