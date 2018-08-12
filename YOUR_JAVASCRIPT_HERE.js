// Simple array filter proto from SO.
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
};

// Write your JS here
var hero = {
    name: '',
    heroic: true,
    inventory: [],
    health: 10,
    maxHealth: 10,
    gold: 0,
    level: 1,
    weapon: {
        type: 'sword',
        damage: 2,
        img: './img/sword.png'
    }
}

const rest = (obj) => {
    obj.health = obj.maxHealth
    if(typeof obj =='undefined'){ // workaround on mocha dependancy
        hero.health = hero.maxHealth
    }
    write(`You've restored your HP to ${hero.maxHealth}`)
    return obj
}

const pickUpItem = (h, item) => {
    h.inventory.push(item)
}

const equipWeapon = (h) => {
    if(h.inventory.length > 0){
        h.weapon = h.inventory[0]
    }
}

const toggleInventory = () => {
    let e = document.getElementById('inventory')
    if(e.style.display == 'block'){
        e.style.display = 'none'
        document.getElementById('inventorytext').innerHTML = 'Inventory'
    } else {
        e.style.display = 'block'
        document.getElementById('inventorytext').innerHTML = 'Inventory (open)'
    }
}

const equipWeaponInventory = (item) => {

    // remove item from inventory
    for(let i in hero.inventory){
        if(hero.inventory[i].type == item.type){
            hero.inventory[i] = null
            hero.inventory.clean(undefined)
        }
    }

    // push current weapon to inventory and swap
    hero.inventory.push(hero.weapon)
    hero.weapon = item
}

const displayStats = () => {
    let health = document.getElementById('hero_health')
    health.setAttribute('value', hero.health)
    health.setAttribute('max', hero.maxHealth)

    /*
        Update hero stats
    */

    // hero name
    let name = document.getElementById('hero_name')
    if(hero.name.length == 0){
        name.innerHTML = `<input type="button" onclick="hero.name = window.prompt('Enter your hero name', 'Johan'); displayStats()" value="Set hero Name">`
    } else {
        name.innerHTML = hero.name
    }

    // hero weapon
    let wn = document.getElementById('hero_weapon_name')
    let wd = document.getElementById('hero_weapon_damage')
    wn.innerHTML = hero.weapon.type
    wd.innerHTML = `+${hero.weapon.damage}`

    document.getElementById('hero_level').innerHTML = hero.level

    // hero level


    /*
        Update inventory
    */

    // update list of intenvory
    // Feeling lazy, not the properway to do it.
    var tmp = ''
    let inv = document.getElementById('inventory')
    for(let item of hero.inventory){
        tmp += `<li><img src="${item.img}" alt="${item.type}" data-damage="${item.damage}" onclick="equipWeaponInventory({type: '${item.type}', damage: ${item.damage}, img: '${item.img}'})"></li>`
    }
    inv.innerHTML = tmp
    
}

const write = (text) => {
    // new dialog text appear up top instead of appending
    document.getElementById('dialog').innerHTML = text + '\n' + document.getElementById('dialog').innerHTML
}

var action = ''
const startGame = () => {
    var items = [
        {type: 'Wooden Sword', damage: 1, img: './img/sword.png'},
        {type: 'Broken Iron Sword', damage: 1, img: './img/sword.png'},
        {type: 'Iron Sword', damage: 4, img: './img/sword.png'},
        {type: 'Steel Sword', damage: 7, img: './img/sword.png'},
        {type: 'Bow', damage: 7, img: './img/bow.jpg'},
        {type: 'Gold Sword', damage: 8, img: './img/sword.png'},
        {type: 'Omega Sword', damage: 20, img: './img/sword.png'},
    ]
    var monsters = [
        // Name of the enemy
        // hit points of enemy
        // Minimal Damage
        // Max damage
        // Reward, value between 0 and 10 (higher reward more xp and item chance)
        // occurance
        { name: 'imp', hp: 6, mindmg: 1, maxdmg: 2, reward: 3 },
        { name: 'ghoul', hp: 7, mindmg: 2, maxdmg: 4, reward: 3 },
        { name: 'dragon', hp: 20, mindmg: 5, maxdmg: 10, reward: 8 },
        { name: 'thief', hp: 3, mindmg: 1, maxdmg: 2, reward: 2 },
        { name: 'orgre', hp: 30, mindmg: 0, maxdmg: 7, reward: 7 }
    ]
    var scenario = [
        'You walked into a forest and came accross an enemy'
    ]

    // check every 250ms until the hero is dead
    var mainloop = () => {
        if(hero.health > 0){
            if(action == 'battle'){

            } else if(action == 'run'){

            } else {
                // what did you do?
                console.log(`unkown action ${action}`)
                return
            }

        } else {
            // Game over
            clearInterval(timer)
            document.getElementsByTagName('body')[0].innerHTML = '<img id="gameover" src="./img/gameover.jpg"">'
        }
    }

    var timer = setInterval(mainloop, 250)

}

// update every second
setInterval(() => {
    displayStats()
}, 250)

displayStats()
startGame()