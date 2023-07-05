const { Warrior, Mage, Priest, Rouge, Archer } = require('./classes/heroes/subclasses.js')
const {Sword, Dagger, WarHammer, BattleAxe, Bow, Wand} = require('./classes/weapons/subclasses.js')
const Arena = require('./classes/arena')

let warrior = new Warrior("Warrior");
warrior.equipWeapon(new BattleAxe())

let mage = new Mage("Mage")
mage.equipWeapon(new Wand())

let priest = new Priest("Priest")
priest.equipWeapon(new WarHammer())

let rouge = new Rouge("Rouge")
rouge.equipWeapon(new Dagger())

let archer = new Archer("Archer")
archer.equipWeapon(new Bow())

Arena.tournament([warrior, priest, archer])