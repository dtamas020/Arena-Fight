This game is a CLI arena FFA.

To run the arena tournament, run:
```
node index.js
```

To create a fighter: (index.js)
```
let warrior = new Warrior("Warrior"); 
```

To add weapon to a fighter: (index.js)
```
warrior.equipWeapon(new BattleAxe())
```

To start a fight: (index.js)
```
let arena = new Arena([warrior, priest, archer])
arena.fight()  
```
The actual game mode is FFA (Free For All).

Only 1 will win the fight.

There is no option for draw.




#

## Informations

The weapons actual damage is always a random number between the min and max value.

Reducer: FLOOR (Opponent's armor / 3)

Hit damage: (Default Hero Damage + Weapon's Calculated Damage) - Reducer


Phases of Fight:
  - Spell check: We check for expired effects. If any of it expired, we remove it.
  - Spell activation: Every Fighter has 10% chance to activate any of it's spells.
  - Fight: Every Fighter attack one of its opponents.
    - console: [Attacker] dealt [Actual Damage] damage to [Opponent] -  [Total Damage] (Reducer)

## Classes

### Hero classes - hero_classes.json
|Name|HP|Abilities|Armour|Evasion|Hand Damage|
|--|--|--|--|--|--|
|Warrior|100|Armour Boost|5|20|5|
|Priest|90|Heal|4|20|1|
|Mage|70|Firestorm|1|5|2|
|Rouge|80|Dodge|3|20|3|
|Archer|80|Headshot|2|15|3|

#

### Weapons - weapons.json
Name|Wielders|Damage (min - max)|Hit Chance
|--|--|--|--|
|Sword|Warrior, Priest, Mage, Rouge, Archer|8 - 12|90%|
|Dagger|Rouge|4 - 5|98%|
|WarHammer|Priest|10 - 15|93%
|BattleAxe|Warrior|12 - 15|92%
|Bow|Archer|7 - 12|89%
|Wand|Mage|9 - 15|97%

#

### Spells - spells.json
|Name|Property|Quantity|Target|turnsUntilActive|
|--|--|--|--|--|
|Armour Boost|Armour|10|self|1|
|Dodge|Evasion|100|self|1|
|Firestorm|Damage|20|self|1|
|Headshot|Damage|20|self|1|
|Heal|HP|10|self|0|

